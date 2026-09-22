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
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[2].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.4)]"
      >
        <span className="text-3xl">❄️</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-cyan-300 uppercase">
          1969 - 1980: THẢM HỌA VÀ MÙA ĐÔNG AI THỨ NHẤT
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-cyan-500/40 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* 1958 Perceptron vs 1969 XOR Trap */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xl font-black text-amber-400">1958: PERCEPTRON RA ĐỜI</span>
            <span className="text-xs font-mono text-slate-400">Frank Rosenblatt</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 text-center">
              <span className="text-2xl">✅</span>
              <div className="text-sm font-bold text-emerald-300 mt-1">Cổng AND</div>
              <div className="text-xs text-slate-400">Giải được</div>
            </div>
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 text-center">
              <span className="text-2xl">✅</span>
              <div className="text-sm font-bold text-emerald-300 mt-1">Cổng OR</div>
              <div className="text-xs text-slate-400">Giải được</div>
            </div>
            <div className="rounded-xl border-2 border-rose-500/60 bg-rose-950/40 p-3 text-center animate-pulse">
              <span className="text-2xl">❌</span>
              <div className="text-sm font-black text-rose-300 mt-1">Cổng XOR</div>
              <div className="text-xs text-rose-400 font-bold">BẤT LỰC HOÀN TOÀN!</div>
            </div>
          </div>
        </div>

        {/* 1969 Fatal Book */}
        <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-950/30 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📚</span>
            <div>
              <div className="text-lg font-bold text-rose-300 uppercase">1969: ĐÒN CHÍ MẠNG TỪ MARVIN MINSKY</div>
              <div className="text-base font-semibold text-slate-200">
                Chứng minh toán học: Mạng nơ-ron đơn tầng không thể giải bài toán phi tuyến tính!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-950/80 px-3 py-1.5 rounded-lg border border-rose-500/40">
            NGÕ CỤT
          </span>
        </div>

        {/* AI Winter Banner */}
        <div
          style={{ opacity: freezeGlow }}
          className="rounded-2xl border-2 border-cyan-400/80 bg-gradient-to-r from-cyan-950/60 via-blue-950/80 to-cyan-950/60 p-5 text-center shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        >
          <div className="text-2xl font-black text-cyan-200 tracking-wider">
            ❄️ KỶ NGUYÊN "MÙA ĐÔNG AI" (15 NĂM BĂNG GIÁ)
          </div>
          <p className="text-sm text-cyan-300/80 mt-1">
            Quỹ nghiên cứu bị cắt giảm 90%, hàng loạt dự án đại học bị đóng cửa vì thất vọng!
          </p>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[2].text}
        durationInFrames={audioManifest.scenes[2].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
