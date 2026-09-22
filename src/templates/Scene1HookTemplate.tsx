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
import { BrandHeader, SubtitleBox } from "../components";

export interface Scene1HookProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  episodeTag?: string;
  title: string;
  question: string;
  categoryBadge?: string;
  points?: Array<{ icon: string; title: string; desc: string; isHighlight?: boolean }>;
}

export const Scene1HookTemplate: React.FC<Scene1HookProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  episodeTag = "TẬP 1: C/C++ NÂNG CAO",
  title,
  question,
  categoryBadge = "CORE EMBEDDED",
  points = [
    { icon: "⚠️", title: "CÁCH CŨ: DỄ DẪN ĐẾN CRASH", desc: "Không kiểm soát ô nhớ, dễ gây tràn RAM hoặc sập hệ thống bất ngờ!" },
    { icon: "✨", title: "GIẢI PHÁP TỐI ƯU CỦA SENIOR", desc: "Tối ưu hóa từng chu kỳ CPU và kiểm soát chuẩn xác cấu trúc phần cứng!", isHighlight: true },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({
    frame,
    fps,
    from: -40,
    to: 0,
    config: { damping: 13 },
  });

  const cardOpacity = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-52 px-6 text-white">
      <Audio src={staticFile(audioPath)} />
      <BrandHeader />

      {/* Episode Badge */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-orange-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(240,90,40,0.4)]"
      >
        <span className="text-3xl">🔥</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-orange-300 uppercase">
          {episodeTag}
        </span>
      </div>

      {/* Main Hook Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-8 w-full max-w-[1020px] rounded-3xl border-2 border-orange-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-500/30 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl">⚡</span>
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-black text-white">
                {title}
              </h3>
              <p className="text-base font-semibold text-orange-400">
                {question}
              </p>
            </div>
          </div>
          <span className="rounded-xl border border-orange-500/50 bg-orange-950/60 px-4 py-2 font-mono text-sm font-black text-orange-300">
            {categoryBadge}
          </span>
        </div>

        {/* 2 Khối Điểm Nhấn Xếp Dọc (Quy tắc Vertical Flow) */}
        <div className="flex flex-col gap-3.5">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 rounded-2xl border p-5 ${
                pt.isHighlight
                  ? "border-orange-500/40 bg-orange-950/30 shadow-[0_0_20px_rgba(240,90,40,0.15)]"
                  : "border-slate-800 bg-slate-900/80"
              }`}
            >
              <span className="text-3xl">{pt.icon}</span>
              <div className="flex flex-col">
                <span className={`text-lg font-black ${pt.isHighlight ? "text-orange-200" : "text-white"}`}>
                  {pt.title}
                </span>
                <span className="text-sm font-medium text-slate-300">
                  {pt.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
