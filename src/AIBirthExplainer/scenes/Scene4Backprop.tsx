import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox } from "../../components/embedded";
import { audioManifest } from "../audioData";
import { subtitlesData } from "../subtitlesData";

export const Scene4Backprop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[3].durationInFrames], [1.0, 1.09], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[3].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/geoffrey_hinton.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.25), transparent 60%),
                         radial-gradient(circle at 50% 85%, rgba(245, 158, 11, 0.2), transparent 70%),
                         linear-gradient(to bottom, rgba(7,8,10,0.9) 0%, rgba(7,8,10,0.5) 45%, rgba(7,8,10,0.85) 100%)`,
          }}
        />
      </div>

      {/* Top Safe Area: Brand Header */}
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="45px" />

      {/* Episode / Category Title Badge */}
      <div
        style={{ transform: `translateY(${titleSpring}px)` }}
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-emerald-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(16,185,129,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">✨</span>
        <span className="font-heading text-2xl font-black tracking-wider text-emerald-300 uppercase">
          1986 • LAN TRUYỀN NGƯỢC (BACKPROPAGATION)
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: Geoffrey Hinton Hero Card (Height ~470px) */}
        <div className="rounded-3xl border-3 border-emerald-400/80 bg-slate-950/90 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.35)] backdrop-blur-2xl flex items-center gap-8">
          <div className="relative w-60 h-76 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl flex-shrink-0">
            <Img
              src={staticFile("images/ai_birth/geoffrey_hinton.jpg")}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${imgZoom})` }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1.5 text-center font-mono text-sm font-bold text-emerald-300">
              GEOFFREY HINTON
            </div>
          </div>

          <div className="flex flex-col gap-3.5 flex-1">
            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-emerald-950/90 px-4 py-1.5 border border-emerald-500/50">
              <span className="text-sm font-mono font-black text-emerald-300 uppercase tracking-wider">
                ÔNG TỔ DEEP LEARNING • NOBEL 2024
              </span>
            </div>
            <h2 className="font-heading text-4xl font-black text-white leading-tight">
              Khám Phá Mạng Nơ-ron Đa Tầng (MLP)
            </h2>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium">
              Xếp chồng nhiều tầng nơ-ron: <span className="text-emerald-300 font-bold">Tầng Ẩn (Hidden Layers)</span> giải phóng sức mạnh phi tuyến tính, đập tan bức tường XOR của Minsky!
            </p>
          </div>
        </div>

        {/* Bottom: Backpropagation Mechanism Pipeline (Height ~300px) */}
        <div className="rounded-3xl border-3 border-amber-400/80 bg-slate-950/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl font-black text-amber-300 uppercase">
                THUẬT TOÁN LAN TRUYỀN NGƯỢC (BACKPROP)
              </span>
            </div>
            <span className="text-sm font-mono text-amber-300 bg-amber-950 px-3.5 py-1 rounded-lg border border-amber-500/40 font-bold">
              TỰ HỌC TỰ SỬA
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="rounded-2xl bg-slate-900/95 border border-slate-700 p-4 text-center">
              <div className="text-base font-mono text-slate-400 font-bold">CHIỀU TIẾN (FORWARD)</div>
              <div className="text-3xl font-black text-cyan-300 mt-1">Dự đoán kết quả ➔</div>
              <div className="text-sm text-slate-400 mt-0.5">Tính toán sai số Loss</div>
            </div>

            <div className="rounded-2xl bg-amber-950/50 border border-amber-500/40 p-4 text-center">
              <div className="text-base font-mono text-amber-300 font-bold">CHIỀU LÙI (BACKPROP)</div>
              <div className="text-3xl font-black text-amber-300 mt-1">← Tự sửa trọng số</div>
              <div className="text-sm text-amber-300/80 mt-0.5">Hạ độ dốc Gradients</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-rose-500/80 bg-rose-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(244,63,94,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🐢</span>
          <div>
            <div className="text-sm font-mono text-rose-300 font-bold uppercase">BI KỊCH PHẦN CỨNG</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              CPU tuần tự quá chậm ➔ Mùa đông lần 2!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">⏳</span>
          <div>
            <div className="text-sm font-mono text-emerald-300 font-bold uppercase">CHỜ ĐỢI 40 NĂM</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Thuật toán chờ Chip bán dẫn ra đời!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles (100% Frame-Perfect WordBoundary) */}
      <SubtitleBox
        chunks={subtitlesData[3].chunks}
        text={audioManifest.scenes[3].text}
        durationInFrames={audioManifest.scenes[3].durationInFrames}
        bottom="380px"
      />

      {/* Ambient Watermark */}
      <div className="absolute bottom-12 inset-x-0 z-10 flex items-center justify-center opacity-40 pointer-events-none">
        <span className="font-mono text-base tracking-widest text-cyan-400 font-bold uppercase">
          ⚡ EMBEDDED-AIOT.COM • NGỌC EINSTEIN ⚡
        </span>
      </div>
    </AbsoluteFill>
  );
};
