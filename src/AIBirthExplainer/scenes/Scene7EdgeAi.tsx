import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox } from "../../components/embedded";
import { audioManifest } from "../audioData";

export const Scene7EdgeAi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({
    frame,
    fps,
    from: -30,
    to: 0,
    config: { damping: 14 },
  });

  const cardOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(frame / 6) * 0.05 + 1.0;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[6].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.4)]"
      >
        <span className="text-3xl">🔮</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-cyan-300 uppercase">
          TƯƠNG LAI: KỶ NGUYÊN EDGE AI &amp; TINYML
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-cyan-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* The Shift: Cloud to Edge */}
        <div className="rounded-2xl border-2 border-cyan-500/40 bg-cyan-950/30 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-white">CUỘC DI CƯ VỀ THẾ GIỚI PHẦN CỨNG NHÚNG</span>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-900/60 px-3 py-1 rounded">
              XU HƯỚNG BẮT BUỘC
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center">
              <div className="text-xs font-mono text-slate-400">CLOUD AI TRUYỀN THỐNG</div>
              <div className="text-lg font-bold text-rose-300 mt-1">Trễ cao, ngốn điện</div>
              <div className="text-xs text-slate-400 mt-1">Mất mạng là tê liệt!</div>
            </div>
            <div
              style={{ transform: `scale(${pulse})` }}
              className="rounded-xl border-2 border-cyan-400 bg-cyan-950/80 p-4 text-center shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <div className="text-xs font-mono text-cyan-300">EDGE AI / TINYML</div>
              <div className="text-lg font-bold text-cyan-300 mt-1">Thời gian thực, miliwatt</div>
              <div className="text-xs text-cyan-200 mt-1">Xử lý offline 100% tại chỗ!</div>
            </div>
          </div>
        </div>

        {/* Chip Specs: STM32, ESP32, NPU */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">⚡</span>
            <div>
              <div className="text-lg font-bold text-white">CHIP NHỎ NHƯ ĐẦU NGÓN TAY</div>
              <div className="text-sm text-slate-300">
                Mô hình AI nén chạy mượt mà trên STM32, ESP32 hay NPU nhúng của xe tự hành &amp; Robot!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-500/30">
            TINYML
          </span>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[6].text}
        durationInFrames={audioManifest.scenes[6].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
