import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox } from "../../components/embedded";
import { audioManifest } from "../audioData";

export const Scene3FirstWinter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const freezeGlow = Math.sin(frame / 7) * 0.15 + 0.85;

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[2].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/frank_rosenblatt.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-30 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.2), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(244, 63, 94, 0.2), transparent 50%),
                         radial-gradient(circle at 50% 85%, rgba(6, 182, 212, 0.25), transparent 70%),
                         linear-gradient(to bottom, rgba(7,8,10,0.9) 0%, rgba(7,8,10,0.5) 45%, rgba(7,8,10,0.85) 100%)`,
          }}
        />
      </div>

      {/* Top Safe Area: Brand Header */}
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="45px" />

      {/* Episode / Category Title Badge */}
      <div
        style={{ transform: `translateY(${titleSpring}px)` }}
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-cyan-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(6,182,212,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">❄️</span>
        <span className="font-heading text-2xl font-black tracking-wider text-cyan-300 uppercase">
          1958 - 1969 • PERCEPTRON & MÙA ĐÔNG THỨ NHẤT
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: Confrontation Arena Rosenblatt vs Minsky (Height ~470px) */}
        <div className="relative rounded-3xl border-3 border-cyan-400/80 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-2xl grid grid-cols-2 gap-5">
          {/* Left: Frank Rosenblatt */}
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/40 p-5 flex flex-col items-center text-center gap-3">
            <div className="relative w-44 h-56 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xl">
              <Img
                src={staticFile("images/ai_birth/frank_rosenblatt.jpg")}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1 text-center font-mono text-xs font-bold text-emerald-300">
                ROSENBLATT (1958)
              </div>
            </div>
            <div className="text-xl font-mono font-black text-emerald-300">CỖ MÁY PERCEPTRON</div>
            <p className="text-lg text-slate-200 leading-snug font-medium">
              Mạng nơ-ron vật lý đầu tiên: Giải được hàm AND, OR và nhận dạng chữ cái!
            </p>
          </div>

          {/* Center VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full bg-slate-950 border-3 border-amber-400 w-16 h-16 flex items-center justify-center font-heading text-2xl font-black text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.8)]">
            VS
          </div>

          {/* Right: Marvin Minsky */}
          <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/40 p-5 flex flex-col items-center text-center gap-3">
            <div className="relative w-44 h-56 rounded-xl overflow-hidden border-2 border-rose-400 shadow-xl">
              <Img
                src={staticFile("images/ai_birth/marvin_minsky.jpg")}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1 text-center font-mono text-xs font-bold text-rose-300">
                MARVIN MINSKY (1969)
              </div>
            </div>
            <div className="text-xl font-mono font-black text-rose-300">SÁCH "PERCEPTRONS"</div>
            <p className="text-lg text-slate-200 leading-snug font-medium">
              Chứng minh nơ-ron đơn tầng bế tắc trước các bài toán phi tuyến tính!
            </p>
          </div>
        </div>

        {/* Bottom: The XOR Fatal Trap Visual (Height ~300px) */}
        <div className="rounded-3xl border-3 border-rose-500/80 bg-rose-950/60 p-6 shadow-[0_20px_50px_rgba(244,63,94,0.3)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-rose-500/40 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❌</span>
              <span className="text-2xl font-black text-rose-200 uppercase">
                BẪY TOÁN HỌC TỬ THẦN: PHÉP TOÁN XOR
              </span>
            </div>
            <span className="text-xs font-mono text-rose-300 bg-rose-950 px-3 py-1 rounded-lg border border-rose-500/50 font-bold">
              BẾ TẮC HOÀN TOÀN
            </span>
          </div>

          <p className="text-xl text-slate-200 leading-relaxed font-medium mt-2">
            Nơ-ron đơn tầng chỉ vẽ được một đường thẳng phân chia tuyến tính ➔ Không thể giải được dữ liệu phi tuyến tính trong thực tế!
          </p>

          <div className="grid grid-cols-4 gap-3 mt-3">
            <div className="rounded-xl bg-slate-900/90 border border-slate-700 p-2 text-center">
              <div className="text-xs font-mono text-slate-400">0 XOR 0</div>
              <div className="text-2xl font-black text-cyan-300">= 0</div>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-emerald-500/50 p-2 text-center">
              <div className="text-xs font-mono text-emerald-400">0 XOR 1</div>
              <div className="text-2xl font-black text-emerald-300">= 1</div>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-emerald-500/50 p-2 text-center">
              <div className="text-xs font-mono text-emerald-400">1 XOR 0</div>
              <div className="text-2xl font-black text-emerald-300">= 1</div>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-slate-700 p-2 text-center">
              <div className="text-xs font-mono text-slate-400">1 XOR 1</div>
              <div className="text-2xl font-black text-cyan-300">= 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)`, opacity: freezeGlow }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-cyan-400 bg-gradient-to-r from-cyan-950 to-blue-950 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(6,182,212,0.4)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🥶</span>
          <div>
            <div className="text-sm font-mono text-cyan-300 font-bold uppercase">15 NĂM BĂNG GIÁ</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              "Mùa Đông AI" lần thứ nhất!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/90 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(244,63,94,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">💸</span>
          <div>
            <div className="text-sm font-mono text-rose-300 font-bold uppercase">CÚ SỐC TÀI TRỢ</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Chính phủ & quân đội Mỹ cắt sạch vốn!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles */}
      <SubtitleBox
        text={audioManifest.scenes[2].text}
        durationInFrames={audioManifest.scenes[2].durationInFrames}
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
