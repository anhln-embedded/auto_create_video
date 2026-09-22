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

  const cardOpacity = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imgScale = interpolate(frame, [0, audioManifest.scenes[0].durationInFrames], [1.0, 1.1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[0].audioPath)} />

      {/* Real Background Hero Art: Ambient Depth */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/ai_birth_hook_art.jpg")}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${imgScale})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-[#07080a]/90" />
      </div>

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.4)]"
        >
          <span className="text-4xl">🧠</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-cyan-300 uppercase">
            LỊCH SỬ CÔNG NGHỆ: BẢN CHẤT CỦA AI
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Hero Cinematic Card (Height ~600px) */}
        <div className="rounded-3xl border-2 border-cyan-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl">
            <Img
              src={staticFile("images/ai_birth/ai_birth_hook_art.jpg")}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${imgScale})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
                1950 ➔ 2026: 70+ NĂM LỊCH SỬ
              </span>
              <span className="text-sm font-mono text-amber-300 bg-amber-950/90 border border-amber-500/40 px-3.5 py-1.5 rounded-xl font-bold">
                TÀI LIỆU ĐẶC BIỆT
              </span>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-4xl font-black text-white leading-tight">
              HÓA RA AI ĐƯỢC RA ĐỜI NHƯ THẾ NÀO?
            </h2>
            <p className="text-2xl font-bold text-cyan-300 mt-2">
              Phép màu công nghệ siêu nhiên hay toán học từ thời ông bà chúng ta?
            </p>
          </div>
        </div>

        {/* Card 2: Myth vs Fact Grid (Height ~520px) */}
        <div className="grid grid-cols-2 gap-5">
          {/* Left: Myth */}
          <div className="rounded-3xl border-2 border-rose-500/50 bg-rose-950/40 p-7 flex flex-col justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❌</span>
              <span className="text-base font-mono font-black text-rose-300 uppercase tracking-wider">
                ẢO TƯỞNG PHỔ BIẾN
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-100 my-3 leading-snug">
              AI là phép thuật siêu việt mới sinh ra vài năm gần đây!
            </div>
            <span className="text-sm font-mono text-rose-400 font-bold bg-rose-950 px-3.5 py-1.5 rounded-xl border border-rose-500/30 self-start">
              SAI LẦM 99% NGƯỜI DÙNG
            </span>
          </div>

          {/* Right: Truth */}
          <div className="rounded-3xl border-2 border-emerald-500/70 bg-emerald-950/40 p-7 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <span className="text-base font-mono font-black text-emerald-300 uppercase tracking-wider">
                SỰ THẬT KINH NGẠC
              </span>
            </div>
            <div className="text-2xl font-black text-white my-3 leading-snug">
              90% Toán học cốt lõi đã có từ hơn 70 năm trước!
            </div>
            <span className="text-sm font-mono text-emerald-300 font-bold bg-emerald-950 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 self-start">
              ĐẠI SỐ TUYẾN TÍNH 1950
            </span>
          </div>
        </div>

        {/* Card 3: Mystery Punchline (Height ~240px) */}
        <div className="rounded-3xl border-2 border-amber-500/60 bg-amber-950/40 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.2)] text-center">
          <p className="text-2xl md:text-3xl font-black text-amber-300 leading-snug">
            ❓ Vậy tại sao suốt nửa thế kỷ, AI từng bị coi là cú lừa nghìn tỷ đô và chìm vào 2 MÙA ĐÔNG BĂNG GIÁ?
          </p>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[0].text}
        durationInFrames={audioManifest.scenes[0].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
