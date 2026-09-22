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
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[4].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-emerald-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.4)]"
        >
          <span className="text-4xl">🚀</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-emerald-300 uppercase">
            2012: BƯỚC NGOẶT ALEXNET & ĐẾ CHẾ GPU
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Real GPU Photo Banner (Height ~590px) */}
        <div className="rounded-3xl border-2 border-emerald-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
            <Img
              src={staticFile("images/ai_birth/gtx_gpu_real.jpg")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-base font-mono font-bold text-emerald-300 bg-slate-950/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/40">
                NVIDIA GEFORCE GTX 580 (2012)
              </span>
              <span className="text-sm font-mono text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
                100X NHANH HƠN CPU
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              VŨ KHÍ BÍ MẬT: 2 CẠC ĐỒ HỌA CHƠI GAME!
            </h2>
            <p className="text-2xl text-emerald-300 font-medium mt-2 leading-relaxed">
              Alex Krizhevsky & Geoffrey Hinton tận dụng hàng ngàn nhân CUDA tính toán ma trận song song, phá vỡ nút thắt phần cứng kéo dài hàng chục năm!
            </p>
          </div>
        </div>

        {/* Card 2: ImageNet Battle Arena (Height ~470px) */}
        <div className="rounded-3xl border-2 border-emerald-500/60 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              🏆 ĐẠI CHIẾN IMAGENET 2012
            </span>
            <span className="text-sm font-mono text-emerald-300 bg-emerald-950 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold">
              1 TRIỆU BỨC ẢNH
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl border-2 border-slate-700 bg-slate-900/90 p-5 text-center">
              <div className="text-base font-mono text-slate-400 font-bold">THUẬT TOÁN CŨ (30 NĂM)</div>
              <div className="text-4xl font-black text-rose-400 mt-2">Sai số 26.2%</div>
              <div className="text-base text-slate-400 mt-1">Trích xuất đặc trưng thủ công</div>
            </div>

            <div
              style={{ opacity: neonGlow }}
              className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/90 p-5 text-center shadow-[0_0_30px_rgba(16,185,129,0.35)]"
            >
              <div className="text-base font-mono text-emerald-300 font-bold">ALEXNET (DEEP LEARNING)</div>
              <div className="text-5xl font-black text-emerald-300 mt-2">Sai số 15.3%</div>
              <div className="text-base text-emerald-200 mt-1 font-bold">Khai sinh kỷ nguyên Deep Learning!</div>
            </div>
          </div>
        </div>

        {/* Card 3: Historic Epiphany (Height ~280px) */}
        <div className="rounded-3xl border-2 border-amber-500/70 bg-amber-950/50 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] flex items-center gap-7">
          <div className="text-7xl flex-shrink-0">💡</div>
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-black text-amber-300 uppercase">
              BẢN CHẤT LỊCH SỬ CỦA AI
            </div>
            <p className="text-2xl text-slate-100 mt-2.5 leading-relaxed font-medium">
              Mạng nơ-ron không hề sai! Nó chỉ phải ngủ đông 40 năm... để chờ <span className="text-amber-300 font-black">ĐẾ CHẾ CHIP BÁN DẪN RA ĐỜI</span>!
            </p>
          </div>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[4].text}
        durationInFrames={audioManifest.scenes[4].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
