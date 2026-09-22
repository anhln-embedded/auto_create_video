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

export const Scene2AlanTuring: React.FC = () => {
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

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[1].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-blue-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(59,130,246,0.4)]"
      >
        <span className="text-3xl">📜</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-blue-300 uppercase">
          1950 - 1956: CÂU HỎI LỊCH SỬ CỦA ALAN TURING
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-blue-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Quote Card */}
        <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-bold text-amber-400 uppercase tracking-widest">
              BÀI BÁO KHOA HỌC (1950)
            </span>
            <span className="rounded-lg bg-amber-500/20 px-3 py-1 text-xs font-mono font-bold text-amber-300">
              ALAN TURING
            </span>
          </div>
          <p className="text-2xl font-black text-white italic">
            “Liệu cỗ máy có biết suy nghĩ?”
          </p>
          <p className="text-sm text-slate-300">
            Khai sinh phép thử <span className="text-amber-300 font-bold">Turing Test</span> kinh điển: Máy tính giao tiếp như người thật.
          </p>
        </div>

        {/* Historic Event: Dartmouth 1956 */}
        <div className="rounded-2xl border-2 border-blue-500/40 bg-blue-950/30 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏛️</span>
            <div>
              <div className="text-xl font-black text-blue-300">HỘI NGHỊ DARTMOUTH 1956</div>
              <div className="text-sm text-slate-300">Thuật ngữ "Artificial Intelligence" (Trí tuệ nhân tạo) ra đời</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="rounded-xl border border-blue-500/30 bg-slate-900/80 p-3.5 text-center">
              <div className="text-xs font-mono text-slate-400">THIÊN TÀI HỘI TỤ</div>
              <div className="text-base font-bold text-white mt-1">John McCarthy, Marvin Minsky</div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3.5 text-center">
              <div className="text-xs font-mono text-emerald-400">TUYÊN BỐ LẠC QUAN</div>
              <div className="text-base font-bold text-emerald-300 mt-1">20 năm nữa máy thay thế người!</div>
            </div>
          </div>
        </div>

        {/* The Giant Vintage Computer */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📟</span>
            <div className="text-sm font-semibold text-slate-300">
              Máy tính thời đó: To bằng cả căn phòng, chạy bóng đèn chân không!
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded">
            Vài KB Bộ Nhớ
          </span>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[1].text}
        durationInFrames={audioManifest.scenes[1].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
