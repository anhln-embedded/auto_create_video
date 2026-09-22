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

export const Scene5AlexNetGpu: React.FC = () => {
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

  const neonGlow = Math.sin(frame / 6) * 0.15 + 0.85;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[4].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-emerald-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(16,185,129,0.4)]"
      >
        <span className="text-3xl">🚀</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-emerald-300 uppercase">
          2012: BƯỚC NGOẶT ALEXNET VÀ ĐẾ CHẾ GPU
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-emerald-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* The 2012 ImageNet Clash */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/30 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-white">CUỘC THI IMAGENET 2012</span>
            <span className="rounded-lg bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
              ĐỊA CHẤN CÔNG NGHỆ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-center">
              <div className="text-xs font-mono text-slate-400">PHƯƠNG PHÁP CŨ (30 NĂM)</div>
              <div className="text-2xl font-black text-rose-400 mt-1">Sai số 26.2%</div>
              <div className="text-xs text-slate-400 mt-1">Dùng thuật toán truyền thống</div>
            </div>
            <div
              style={{ opacity: neonGlow }}
              className="rounded-xl border-2 border-emerald-400 bg-emerald-950/80 p-4 text-center shadow-[0_0_25px_rgba(16,185,129,0.3)]"
            >
              <div className="text-xs font-mono text-emerald-300">ALEXNET (DEEP LEARNING)</div>
              <div className="text-2xl font-black text-emerald-300 mt-1">Sai số 15.3%</div>
              <div className="text-xs text-emerald-200 mt-1">Hạ gục toàn bộ đối thủ!</div>
            </div>
          </div>
        </div>

        {/* Hardware Hero: NVIDIA GTX 580 */}
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🎮</span>
            <div>
              <div className="text-lg font-bold text-white">VŨ KHÍ BÍ MẬT: 2 CẠC ĐỒ HỌA GTX 580</div>
              <div className="text-sm text-slate-300">
                GPU tính toán hàng ngàn phép nhân ma trận song song trong nháy mắt!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            NVIDIA CUDA
          </span>
        </div>

        {/* The Epiphany */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 text-center">
          <p className="text-base font-bold text-amber-300">
            💡 Mạng Nơ-ron không hề sai! Nó chỉ phải chờ đợi 40 năm... để Chip Bán Dẫn theo kịp!
          </p>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[4].text}
        durationInFrames={audioManifest.scenes[4].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
