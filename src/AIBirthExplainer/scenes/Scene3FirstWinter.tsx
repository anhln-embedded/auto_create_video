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

export const Scene3FirstWinter: React.FC = () => {
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

  const freezeGlow = Math.sin(frame / 8) * 0.2 + 0.8;

  return (
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[2].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.4)]"
        >
          <span className="text-4xl">❄️</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-cyan-300 uppercase">
            1958 - 1969: CỖ MÁY PERCEPTRON & MÙA ĐÔNG THỨ NHẤT
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Two Scientists Confrontation (Height ~590px) */}
        <div className="rounded-3xl border-2 border-cyan-500/60 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-5">
            {/* Left: Frank Rosenblatt & Perceptron */}
            <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/30 p-5 flex flex-col items-center text-center gap-3">
              <div className="relative w-40 h-52 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xl flex-shrink-0">
                <Img
                  src={staticFile("images/ai_birth/frank_rosenblatt.jpg")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1 text-center font-mono text-sm font-bold text-emerald-300">
                  ROSENBLATT (1958)
                </div>
              </div>
              <div className="text-xl font-mono font-bold text-emerald-300">CỖ MÁY PERCEPTRON</div>
              <p className="text-xl text-slate-200 leading-snug font-medium">
                Mạng nơ-ron vật lý đầu tiên: Học giải hàm AND, OR và nhận diện bảng chữ cái!
              </p>
            </div>

            {/* Right: Marvin Minsky & The Blow */}
            <div className="rounded-2xl border-2 border-rose-500/60 bg-rose-950/30 p-5 flex flex-col items-center text-center gap-3">
              <div className="relative w-40 h-52 rounded-xl overflow-hidden border-2 border-rose-400 shadow-xl flex-shrink-0">
                <Img
                  src={staticFile("images/ai_birth/marvin_minsky.jpg")}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1 text-center font-mono text-sm font-bold text-rose-300">
                  MARVIN MINSKY (1969)
                </div>
              </div>
              <div className="text-xl font-mono font-bold text-rose-300">SÁCH "PERCEPTRONS"</div>
              <p className="text-xl text-slate-200 leading-snug font-medium">
                Chứng minh nơ-ron đơn tầng bế tắc trước các bài toán phi tuyến tính!
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: The XOR Fatal Trap (Height ~470px) */}
        <div className="rounded-3xl border-2 border-rose-500/60 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl">❌</span>
              <span className="text-2xl md:text-3xl font-black text-rose-300 uppercase tracking-wide">
                THẢM HỌA TOÁN HỌC: BẪY PHÉP TOÁN XOR
              </span>
            </div>
            <span className="text-base font-mono text-rose-300 bg-rose-950 px-4 py-1.5 rounded-xl border border-rose-500/40 font-bold">
              BẾ TẮC 100%
            </span>
          </div>

          <p className="text-2xl text-slate-100 leading-relaxed font-medium">
            Nơ-ron đơn tầng chỉ vẽ được <span className="text-rose-300 font-bold">một đường thẳng phân chia tuyến tính</span>. Với phép toán XOR, không một đường thẳng nào có thể phân tách được dữ liệu!
          </p>

          <div className="grid grid-cols-4 gap-3 mt-1">
            <div className="rounded-xl bg-slate-900 border border-slate-700 p-3 text-center">
              <div className="text-sm font-mono text-slate-400">0 XOR 0</div>
              <div className="text-2xl font-black text-cyan-300">= 0</div>
            </div>
            <div className="rounded-xl bg-slate-900 border border-emerald-500/40 p-3 text-center">
              <div className="text-sm font-mono text-emerald-400">0 XOR 1</div>
              <div className="text-2xl font-black text-emerald-300">= 1</div>
            </div>
            <div className="rounded-xl bg-slate-900 border border-emerald-500/40 p-3 text-center">
              <div className="text-sm font-mono text-emerald-400">1 XOR 0</div>
              <div className="text-2xl font-black text-emerald-300">= 1</div>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-700 p-3 text-center">
              <div className="text-sm font-mono text-slate-400">1 XOR 1</div>
              <div className="text-2xl font-black text-cyan-300">= 0</div>
            </div>
          </div>
        </div>

        {/* Card 3: 15-Year AI Winter Banner (Height ~280px) */}
        <div
          style={{ opacity: freezeGlow }}
          className="rounded-3xl border-2 border-cyan-400/80 bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-cyan-950/90 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(6,182,212,0.3)] flex items-center gap-7"
        >
          <div className="text-7xl flex-shrink-0">🥶</div>
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-black text-cyan-200 uppercase tracking-wide">
              ❄️ 15 NĂM BĂNG GIÁ: "MÙA ĐÔNG AI" THỨ NHẤT
            </div>
            <p className="text-2xl text-cyan-100 mt-2.5 leading-relaxed font-medium">
              Chính phủ và quân đội Mỹ cắt sạch toàn bộ tài trợ. AI bị xem là dự án lừa đảo hoang tưởng, cả thế giới quay lưng suốt 15 năm!
            </p>
          </div>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[2].text}
        durationInFrames={audioManifest.scenes[2].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
