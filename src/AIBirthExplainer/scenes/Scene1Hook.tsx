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

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({
    frame,
    fps,
    from: -40,
    to: 0,
    config: { damping: 13 },
  });

  const cardOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(frame / 6) * 0.05 + 1.0;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[0].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.4)]"
      >
        <span className="text-3xl">🧠</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-cyan-300 uppercase">
          LỊCH SỬ CÔNG NGHỆ: SỰ THẬT VỀ AI
        </span>
      </div>

      {/* Main Hook Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-cyan-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Title */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl" style={{ transform: `scale(${pulse})` }}>🤖</span>
            <div>
              <h3 className="font-heading text-3xl font-black text-white">
                HÓA RA AI ĐƯỢC RA ĐỜI NHƯ THẾ NÀO?
              </h3>
              <p className="text-base font-semibold text-cyan-400">
                Phép màu tương lai hay chỉ là toán học 70 năm trước?
              </p>
            </div>
          </div>
          <span className="rounded-xl bg-cyan-950/80 px-4 py-2 font-mono text-sm font-bold text-cyan-300 border border-cyan-500/30">
            1950 ➔ 2026
          </span>
        </div>

        {/* Visual Comparison: Illusion vs Reality */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Illusion */}
          <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-950/30 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">❌</span>
              <div>
                <div className="text-lg font-bold text-rose-300 uppercase">ẢO TƯỞNG PHỔ BIẾN</div>
                <div className="text-xl font-semibold text-slate-200">
                  AI là siêu trí tuệ ngoài hành tinh mới phát minh
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-rose-400 bg-rose-950/80 px-3 py-1.5 rounded-lg border border-rose-500/30">
              HOANG ĐƯỜNG
            </span>
          </div>

          {/* Card 2: Truth */}
          <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/40 p-5 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="flex items-center gap-4">
              <span className="text-4xl">💡</span>
              <div>
                <div className="text-lg font-bold text-emerald-300 uppercase">SỰ THẬT BẤT NGỜ</div>
                <div className="text-xl font-semibold text-white">
                  90% Toán học AI đã có từ thời ông bà chúng ta!
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/40">
              NHÂN MA TRẬN
            </span>
          </div>
        </div>

        {/* Shocking Mystery Box */}
        <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-5 text-center">
          <p className="text-xl font-extrabold text-amber-300">
            ❓ Tại sao suốt 40 năm, AI từng bị coi là cú lừa đảo nghìn tỷ đô?
          </p>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[0].text}
        durationInFrames={audioManifest.scenes[0].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
