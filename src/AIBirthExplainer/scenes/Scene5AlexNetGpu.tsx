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

export const Scene5AlexNetGpu: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const neonGlow = Math.sin(frame / 6) * 0.15 + 0.85;

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[4].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/gtx_gpu_real.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.25), transparent 60%),
                         radial-gradient(circle at 50% 85%, rgba(6, 182, 212, 0.2), transparent 70%),
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
        <span className="text-3xl">🚀</span>
        <span className="font-heading text-2xl font-black tracking-wider text-emerald-300 uppercase">
          2012 • BƯỚC NGOẶT ALEXNET & ĐẾ CHẾ GPU
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: NVIDIA GeForce GTX Real Photo Banner (Height ~470px) */}
        <div className="rounded-3xl border-3 border-emerald-400/80 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.35)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl">
            <Img
              src={staticFile("images/ai_birth/gtx_gpu_real.jpg")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-base font-mono font-bold text-emerald-300 bg-slate-950/90 px-3.5 py-1 rounded-xl border border-emerald-500/40">
                NVIDIA GEFORCE GTX 580 (2012)
              </span>
              <span className="text-sm font-mono text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
                100X NHANH HƠN CPU
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="font-heading text-4xl font-black text-white leading-tight">
              VŨ KHÍ BÍ MẬT: 2 CẠC ĐỒ HỌA CHƠI GAME!
            </h2>
            <p className="text-2xl text-emerald-300 font-medium mt-1 leading-relaxed">
              Alex Krizhevsky & Geoffrey Hinton tận dụng hàng ngàn nhân CUDA tính ma trận song song, phá vỡ nút thắt kéo dài 40 năm!
            </p>
          </div>
        </div>

        {/* Bottom: ImageNet 2012 Battle Arena (Height ~300px) */}
        <div className="rounded-3xl border-3 border-emerald-400/80 bg-slate-950/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
            <span className="text-2xl font-black text-white uppercase">
              🏆 ĐẠI CHIẾN IMAGENET 2012 (1 TRIỆU BỨC ẢNH)
            </span>
            <span className="text-sm font-mono text-emerald-300 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-500/40 font-bold">
              BƯỚC NGOẶT LỊCH SỬ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-2">
            <div className="rounded-2xl border-2 border-slate-700 bg-slate-900/95 p-4 text-center">
              <div className="text-sm font-mono text-slate-400 font-bold">THUẬT TOÁN CŨ (30 NĂM)</div>
              <div className="text-4xl font-black text-rose-400 mt-1">Sai số 26.2%</div>
              <div className="text-xs text-slate-400 mt-1">Trích xuất thủ công</div>
            </div>

            <div
              style={{ opacity: neonGlow }}
              className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/90 p-4 text-center shadow-[0_0_30px_rgba(16,185,129,0.35)]"
            >
              <div className="text-sm font-mono text-emerald-300 font-bold">ALEXNET (DEEP LEARNING)</div>
              <div className="text-5xl font-black text-emerald-300 mt-1">Sai số 15.3%</div>
              <div className="text-xs text-emerald-200 mt-1 font-bold">Khai sinh kỷ nguyên mới!</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">💡</span>
          <div>
            <div className="text-sm font-mono text-emerald-300 font-bold uppercase">BẢN CHẤT LỊCH SỬ</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Mạng nơ-ron chỉ ngủ đông để chờ GPU!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-amber-400 bg-amber-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(245,158,11,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">⚡</span>
          <div>
            <div className="text-sm font-mono text-amber-300 font-bold uppercase">ĐẾ CHẾ BÁN DẪN</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              NVIDIA trở thành vua công nghệ thế giới!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles */}
      <SubtitleBox
        text={audioManifest.scenes[4].text}
        durationInFrames={audioManifest.scenes[4].durationInFrames}
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
