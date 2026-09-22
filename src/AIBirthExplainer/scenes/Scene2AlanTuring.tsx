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

export const Scene2AlanTuring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[1].durationInFrames], [1.0, 1.09], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[1].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/alan_turing.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, rgba(59, 130, 246, 0.25), transparent 60%),
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
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-blue-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(59,130,246,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">📜</span>
        <span className="font-heading text-2xl font-black tracking-wider text-blue-300 uppercase">
          1950 - 1956 • CÂU HỎI LỊCH SỬ CỦA ALAN TURING
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: Alan Turing Portrait + Historic Quote Card (Height ~440px) */}
        <div className="rounded-3xl border-3 border-amber-400/80 bg-slate-950/90 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.3)] backdrop-blur-2xl flex items-center gap-8">
          <div className="relative w-56 h-72 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl flex-shrink-0">
            <Img
              src={staticFile("images/ai_birth/alan_turing.jpg")}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${imgZoom})` }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-1.5 text-center font-mono text-sm font-bold text-amber-300">
              ALAN TURING (1912-1954)
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-950/90 px-4 py-1.5 border border-amber-500/40">
              <span className="text-sm font-mono font-black text-amber-300 uppercase tracking-wider">
                BÀI BÁO KHOA HỌC 1950
              </span>
            </div>
            <h2 className="font-heading text-4xl font-black text-white italic leading-tight">
              “Liệu cỗ máy có biết suy nghĩ?”
            </h2>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium">
              Thiên tài toán học đề xuất phép thử <span className="text-amber-300 font-bold">Turing Test</span>: Đặt nền móng lý thuyết đầu tiên cho toàn bộ ngành AI nhân loại!
            </p>
          </div>
        </div>

        {/* Bottom: Real ENIAC Supercomputer Banner (Height ~330px) */}
        <div className="relative h-[330px] rounded-3xl overflow-hidden border-3 border-blue-400/70 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <Img
            src={staticFile("images/ai_birth/eniac_computer.jpg")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-white">SIÊU MÁY TÍNH ENIAC (1946)</div>
              <div className="text-xl text-cyan-300 font-medium mt-1">Nặng 30 tấn, to bằng căn phòng, 18,000 bóng đèn chân không!</div>
            </div>
            <span className="rounded-xl bg-blue-950/90 border border-blue-400/50 px-4 py-2 font-mono text-sm font-bold text-blue-200">
              VINTAGE 1950s
            </span>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-blue-500/80 bg-blue-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(59,130,246,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🏛️</span>
          <div>
            <div className="text-sm font-mono text-blue-300 font-bold uppercase">HỘI NGHỊ DARTMOUTH 1956</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Khai sinh cụm từ "Trí Tuệ Nhân Tạo"
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-amber-400 bg-amber-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(245,158,11,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">⚠️</span>
          <div>
            <div className="text-sm font-mono text-amber-300 font-bold uppercase">KỲ VỌNG HOANG TƯỞNG</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              "20 năm nữa máy sẽ thay thế người!"
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles */}
      <SubtitleBox
        text={audioManifest.scenes[1].text}
        durationInFrames={audioManifest.scenes[1].durationInFrames}
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
