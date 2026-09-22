#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZeroTTS Batch & Single Synthesizer for Auto_create_video.
Powered by zeroweight-ai/ZeroTTS (Vietnamese Zero-Shot TTS on CPU).
"""

from __future__ import annotations

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
import re
import tempfile
import time
from pathlib import Path

# Ensure UTF-8 output streams on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

try:
    import numpy as np
    from zerotts import ZeroTTS
    from zerotts.text_norm import normalize_vi_text
except ImportError as err:
    print(
        f"Error: Required Python packages not found ({err}). "
        "Please install via: pip install zerotts",
        file=sys.stderr,
    )
    sys.exit(1)


def convert_wav_to_mp3(wav_path: str, mp3_path: str, bitrate: str = "192k") -> bool:
    """Convert WAV to MP3 using ffmpeg if available."""
    ffmpeg_bin = shutil.which("ffmpeg")
    if not ffmpeg_bin:
        print("Warning: ffmpeg not found in PATH, skipping MP3 conversion.", file=sys.stderr)
        return False

    cmd = [
        ffmpeg_bin,
        "-y",
        "-v", "error",
        "-i", wav_path,
        "-b:a", bitrate,
        mp3_path,
    ]
    try:
        subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error converting {wav_path} to {mp3_path}: {e}", file=sys.stderr)
        return False


def get_audio_duration_seconds(file_path: str) -> float:
    """Estimate duration using ffprobe, soundfile or file size."""
    try:
        import soundfile as sf
        info = sf.info(file_path)
        return float(info.duration)
    except Exception:
        pass

    ffprobe_bin = shutil.which("ffprobe")
    if ffprobe_bin:
        try:
            cmd = [
                ffprobe_bin,
                "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                file_path,
            ]
            res = subprocess.run(cmd, capture_output=True, text=True, check=True)
            return float(res.stdout.strip())
        except Exception:
            pass

    size = os.path.getsize(file_path)
    return round(size / 24000.0, 2)


def split_text_into_chunks(text: str, max_words: int = 35) -> list[str]:
    """Split long text into sentence chunks to prevent buffer overflow."""
    raw_parts = re.split(r'([.?!;:\n]+)', text)
    sentences = []
    current = ""
    for part in raw_parts:
        if not part:
            continue
        if re.match(r'^[.?!;:\n]+$', part):
            current += part
            if current.strip():
                sentences.append(current.strip())
            current = ""
        else:
            current += part
    if current.strip():
        sentences.append(current.strip())

    chunks = []
    curr_chunk = []
    curr_len = 0
    for s in sentences:
        s_words = len(s.split())
        if curr_len + s_words > max_words and curr_chunk:
            chunks.append(" ".join(curr_chunk))
            curr_chunk = [s]
            curr_len = s_words
        else:
            curr_chunk.append(s)
            curr_len += s_words
    if curr_chunk:
        chunks.append(" ".join(curr_chunk))

    return chunks if chunks else [text]


def synthesize_single(
    tts: ZeroTTS,
    text: str,
    output_path: str,
    voice: str = "quangminh",
    cfg_scale: float = 1.0,
    export_format: str = "mp3",
    fps: int = 30,
    buffer_frames: int = 3,
) -> dict:
    out_p = Path(output_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    norm_text = normalize_vi_text(text)
    chunks = split_text_into_chunks(norm_text, max_words=32)
    t0 = time.perf_counter()

    if len(chunks) == 1:
        audio = tts.synthesize(chunks[0], voice=voice, cfg_scale=cfg_scale)
    else:
        audio_segments = []
        silence_samples = int(tts.sample_rate * 0.12)
        for i, c in enumerate(chunks):
            seg = tts.synthesize(c, voice=voice, cfg_scale=cfg_scale)
            audio_segments.append(seg)
            if i < len(chunks) - 1:
                if len(seg.shape) == 2:
                    silence = np.zeros((seg.shape[0], silence_samples), dtype=seg.dtype)
                else:
                    silence = np.zeros((silence_samples,), dtype=seg.dtype)
                audio_segments.append(silence)
        audio = np.concatenate(audio_segments, axis=-1)

    elapsed = time.perf_counter() - t0
    sample_rate = tts.sample_rate
    num_samples = audio.shape[-1]
    duration_sec = round(num_samples / sample_rate, 2)

    is_mp3 = export_format.lower() == "mp3" or str(out_p).lower().endswith(".mp3")

    if is_mp3:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_wav:
            tmp_wav_path = tmp_wav.name
        try:
            tts.save_audio(audio, tmp_wav_path)
            success = convert_wav_to_mp3(tmp_wav_path, str(out_p))
            if not success:
                fallback_wav = str(out_p.with_suffix(".wav"))
                shutil.copyfile(tmp_wav_path, fallback_wav)
                out_p = Path(fallback_wav)
        finally:
            if os.path.exists(tmp_wav_path):
                os.remove(tmp_wav_path)
    else:
        tts.save_audio(audio, str(out_p))

    size_bytes = os.path.getsize(str(out_p))
    duration_in_frames = math.ceil(duration_sec * fps) + buffer_frames

    return {
        "text": text,
        "normalizedText": norm_text,
        "filePath": str(out_p),
        "sizeBytes": size_bytes,
        "durationSec": duration_sec,
        "durationInFrames": duration_in_frames,
        "synthesisTimeSec": round(elapsed, 2),
        "realtimeFactor": round(duration_sec / elapsed, 2) if elapsed > 0 else 0,
    }


def synthesize_batch(
    topic_key: str,
    scenes: list[dict],
    output_dir: str = "public/audio",
    voice: str = "quangminh",
    threads: int = 4,
    cfg_scale: float = 1.0,
    export_format: str = "mp3",
    fps: int = 30,
    buffer_frames: int = 3,
    force: bool = False,
) -> dict:
    topic_dir = Path(output_dir).resolve() / topic_key
    topic_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n🎙️ [ZeroTTS] Initializing model for topic: '{topic_key}' ({len(scenes)} scenes)...", file=sys.stderr)
    t_init = time.perf_counter()
    tts = ZeroTTS.from_pretrained(intra_op_num_threads=threads)
    init_sec = time.perf_counter() - t_init
    print(f"⚡ Model ready in {init_sec:.2f}s", file=sys.stderr)

    results = []
    total_frames = 0
    ext = ".mp3" if export_format.lower() == "mp3" else ".wav"

    for i, scene in enumerate(scenes, 1):
        scene_id = scene.get("id", f"scene_{i}")
        text = scene.get("text", "")
        text_to_speak = scene.get("spokenText") or text
        scene_voice = scene.get("voice") or voice
        scene_file = topic_dir / f"{scene_id}{ext}"

        print(f"\n[{i}/{len(scenes)}] Synthesizing '{scene_id}'...", file=sys.stderr)
        print(f"      Text: {text[:60]}{'…' if len(text) > 60 else ''}", file=sys.stderr)

        if not force and scene_file.exists() and scene_file.stat().st_size > 1000:
            dur_sec = round(get_audio_duration_seconds(str(scene_file)), 2)
            dur_frames = math.ceil(dur_sec * fps) + buffer_frames
            print(f"      ✓ Using cached: {dur_sec}s (~{dur_frames} frames)", file=sys.stderr)
            res = {
                "id": scene_id,
                "text": text,
                "audioPath": f"audio/{topic_key}/{scene_file.name}",
                "filePath": str(scene_file),
                "sizeBytes": scene_file.stat().st_size,
                "estimatedDurationSec": dur_sec,
                "durationInFrames": dur_frames,
            }
        else:
            single_res = synthesize_single(
                tts=tts,
                text=text_to_speak,
                output_path=str(scene_file),
                voice=scene_voice,
                cfg_scale=cfg_scale,
                export_format=export_format,
                fps=fps,
                buffer_frames=buffer_frames,
            )
            print(
                f"      ✓ Done: {single_res['durationSec']}s (~{single_res['durationInFrames']} frames) "
                f"in {single_res['synthesisTimeSec']}s ({single_res['realtimeFactor']}x RT)",
                file=sys.stderr,
            )
            res = {
                "id": scene_id,
                "text": text,
                "audioPath": f"audio/{topic_key}/{scene_file.name}",
                "filePath": str(scene_file),
                "sizeBytes": single_res["sizeBytes"],
                "estimatedDurationSec": single_res["durationSec"],
                "durationInFrames": single_res["durationInFrames"],
            }

        results.append(res)
        total_frames += res["durationInFrames"]

    total_sec = round((total_frames / fps) * 10) / 10

    manifest_data = {
        "topic": topic_key,
        "engine": "ZeroTTS",
        "voice": voice,
        "totalScenes": len(scenes),
        "totalDurationFrames": total_frames,
        "totalDurationSec": total_sec,
        "scenes": results,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    manifest_path = topic_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest_data, indent=2, ensure_ascii=False), encoding="utf-8")

    src_topic_dir = Path.cwd() / "src" / topic_key
    if src_topic_dir.exists() and src_topic_dir.is_dir():
        ts_code = f"""// Auto-generated by ZeroTTS generator
export const audioManifest = {json.dumps(manifest_data, indent=2, ensure_ascii=False)} as const;
"""
        ts_path = src_topic_dir / "audioData.ts"
        ts_path.write_text(ts_code, encoding="utf-8")
        print(f"📄 Generated TypeScript manifest: {ts_path}", file=sys.stderr)

    print(f"\n🎉 All ZeroTTS audio files generated successfully!", file=sys.stderr)
    print(f"📊 Total duration: {total_sec}s ({total_frames} frames @ {fps}fps)", file=sys.stderr)
    print(f"📄 Manifest saved at: {manifest_path}\n", file=sys.stderr)

    return manifest_data


def main() -> None:
    parser = argparse.ArgumentParser(description="ZeroTTS Audio Synthesizer for Auto_create_video")
    subparsers = parser.add_subparsers(dest="command", required=True)

    p_batch = subparsers.add_parser("batch", help="Batch synthesize topic scenes")
    p_batch.add_argument("--topic", required=True, help="Topic identifier / folder name")
    p_batch.add_argument("--scenes-file", help="Path to JSON file containing array of scenes [{id, text, ...}]")
    p_batch.add_argument("--scenes-json", help="Inline JSON string containing array of scenes")
    p_batch.add_argument("-o", "--output-dir", default="public/audio", help="Audio output root directory")
    p_batch.add_argument("-v", "--voice", default="quangminh", help="Default voice ID")
    p_batch.add_argument("--threads", type=int, default=4, help="Inference threads")
    p_batch.add_argument("--cfg-scale", type=float, default=1.0)
    p_batch.add_argument("--format", choices=["mp3", "wav"], default="mp3", help="Audio format")
    p_batch.add_argument("--fps", type=int, default=30)
    p_batch.add_argument("--buffer-frames", type=int, default=3, help="Safety frame padding after speech")
    p_batch.add_argument("--force", action="store_true", help="Force overwrite cached audio")

    args = parser.parse_args()

    if args.command == "batch":
        scenes = []
        if args.scenes_file:
            with open(args.scenes_file, "r", encoding="utf-8") as f:
                scenes = json.load(f)
        elif args.scenes_json:
            scenes = json.loads(args.scenes_json)
        else:
            print("Error: Either --scenes-file or --scenes-json must be provided.", file=sys.stderr)
            sys.exit(1)

        manifest = synthesize_batch(
            topic_key=args.topic,
            scenes=scenes,
            output_dir=args.output_dir,
            voice=args.voice,
            threads=args.threads,
            cfg_scale=args.cfg_scale,
            export_format=args.format,
            fps=args.fps,
            buffer_frames=args.buffer_frames,
            force=args.force,
        )
        print(json.dumps(manifest, ensure_ascii=False))


if __name__ == "__main__":
    main()
