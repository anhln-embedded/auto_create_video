import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { normalizePronunciation } from "./normalizer";
import { synthesizeEdgeTTSBatch, AudioManifest, SceneAudioInput } from "./edge_tts_runner";

export interface SynthesizeOptions {
  topic: string;
  scenes: SceneAudioInput[];
  engine?: "zerotts" | "edge-tts" | "auto";
  voice?: string;
  outputDir?: string;
  fps?: number;
  bufferFrames?: number;
  targetSrcDir?: string;
}

/**
 * Unified Audio Synthesizer:
 * Automatically normalizes technical terminology, then synthesizes audio
 * via ZeroTTS (offline CPU) or EdgeTTS (online lightweight).
 */
export async function synthesizeVoiceover(options: SynthesizeOptions): Promise<AudioManifest> {
  const engine = options.engine || "auto";
  const outputDir = options.outputDir || path.resolve(process.cwd(), "public/audio");
  const fps = options.fps || 30;
  const bufferFrames = options.bufferFrames ?? 3;

  // Step 1: Pre-process scenes to apply technical pronunciation normalizer
  const normalizedScenes: SceneAudioInput[] = options.scenes.map((s) => ({
    ...s,
    spokenText: normalizePronunciation(s.spokenText || s.text),
  }));

  // Step 2: Choose engine
  if (engine === "edge-tts") {
    return synthesizeEdgeTTSBatch(options.topic, normalizedScenes, {
      voice: options.voice || "vi-VN-NamMinhNeural",
      outputDir,
      fps,
      bufferFrames,
      targetSrcDir: options.targetSrcDir,
    });
  }

  // If engine is 'zerotts' or 'auto', try ZeroTTS first, fallback to EdgeTTS
  try {
    console.log(`\n🎙️ [Synthesizer] Invoking ZeroTTS engine for '${options.topic}'...`);
    const pyScript = path.resolve(__dirname, "zerotts_runner.py");

    const tmpJson = path.resolve(process.cwd(), `.temp_scenes_${Date.now()}.json`);
    fs.writeFileSync(tmpJson, JSON.stringify(normalizedScenes, null, 2), "utf-8");

    const args = [
      pyScript,
      "batch",
      "--topic",
      options.topic,
      "--scenes-file",
      tmpJson,
      "--output-dir",
      outputDir,
      "--voice",
      options.voice || "quangminh",
      "--fps",
      String(fps),
      "--buffer-frames",
      String(bufferFrames),
    ];

    const resultManifest = await new Promise<AudioManifest>((resolve, reject) => {
      const proc = spawn("python", args, { stdio: ["ignore", "pipe", "inherit"] });
      let stdout = "";

      proc.stdout.on("data", (data) => {
        stdout += data.toString("utf-8");
      });

      proc.on("close", (code) => {
        if (fs.existsSync(tmpJson)) fs.unlinkSync(tmpJson);
        if (code === 0) {
          try {
            const parsed = JSON.parse(stdout.trim());
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Failed to parse ZeroTTS JSON output: ${stdout}`));
          }
        } else {
          reject(new Error(`ZeroTTS exited with code ${code}`));
        }
      });

      proc.on("error", (err) => {
        if (fs.existsSync(tmpJson)) fs.unlinkSync(tmpJson);
        reject(err);
      });
    });

    return resultManifest;
  } catch (err) {
    if (engine === "zerotts") {
      throw err;
    }
    console.warn(`⚠️ [Synthesizer] ZeroTTS failed or python unavailable (${err}). Falling back to EdgeTTS...`);
    return synthesizeEdgeTTSBatch(options.topic, normalizedScenes, {
      voice: "vi-VN-NamMinhNeural",
      outputDir,
      fps,
      bufferFrames,
      targetSrcDir: options.targetSrcDir,
    });
  }
}
