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
import { subtitlesData } from "../subtitlesData";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth physics-based entrance springs
  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  // Ken-Burns slow cinematic zoom
  const imgZoom = interpolate(frame, [0, audioManifest.scenes[0].durationInFrames], [1.0, 1.09], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[0].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/ai_birth_hook_art.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-40 scale-125"
        />
        {/* Ambient Gradient Depth with glowing bottom floor */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, rgba(6, 182, 212, 0.25), transparent 60%),
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
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-cyan-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(6,182,212,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">🧠</span>
        <span className="font-heading text-2xl font-black tracking-wider text-cyan-300 uppercase">
          LỊCH SỬ CÔNG NGHỆ • BẢN CHẤT CỦA AI
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 rounded-3xl overflow-hidden border-3 border-cyan-400/80 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_60px_rgba(6,182,212,0.4)]"
      >
        <Img
          src={staticFile("images/ai_birth/ai_birth_hook_art.jpg")}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${imgZoom})` }}
        />
        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

        {/* Top Badges inside Hero */}
        <div className="absolute top-6 inset-x-7 flex items-center justify-between z-20">
          <span className="rounded-xl bg-slate-950/90 border border-cyan-400/60 px-4 py-2 font-mono text-base font-bold text-cyan-300 shadow-lg">
            1950 ➔ 2026 (70+ NĂM)
          </span>
          <span className="rounded-xl bg-amber-950/90 border border-amber-400/60 px-4 py-2 font-mono text-base font-bold text-amber-300 shadow-lg">
            BÍ MẬT LỊCH SỬ
          </span>
        </div>

        {/* Bottom Headline Overlay */}
        <div className="absolute bottom-8 inset-x-8 z-20 flex flex-col gap-3">
          <h1 className="font-heading text-5xl font-black text-white leading-tight drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">
            HÓA RA AI ĐƯỢC RA ĐỜI NHƯ THẾ NÀO?
          </h1>
          <p className="text-3xl font-extrabold text-cyan-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Phép màu công nghệ hay toán học từ thời ông bà chúng ta?
          </p>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        {/* Left Badge: The Myth */}
        <div className="rounded-2xl border-2 border-rose-500/80 bg-rose-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(244,63,94,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">❌</span>
          <div>
            <div className="text-sm font-mono text-rose-300 font-bold uppercase">ẢO TƯỞNG PHỔ BIẾN</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              AI là phép thuật mới sinh ra vài năm?
            </div>
          </div>
        </div>

        {/* Right Badge: The Truth */}
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">💡</span>
          <div>
            <div className="text-sm font-mono text-emerald-300 font-bold uppercase">SỰ THẬT KINH NGẠC</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              90% Toán học đã có từ thập niên 1950!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles (100% Frame-Perfect WordBoundary) */}
      <SubtitleBox
        chunks={subtitlesData[0].chunks}
        text={audioManifest.scenes[0].text}
        durationInFrames={audioManifest.scenes[0].durationInFrames}
        bottom="380px"
      />

      {/* Ambient Watermark in TikTok Platform Overlay Zone */}
      <div className="absolute bottom-12 inset-x-0 z-10 flex items-center justify-center opacity-40 pointer-events-none">
        <span className="font-mono text-base tracking-widest text-cyan-400 font-bold uppercase">
          ⚡ EMBEDDED-AIOT.COM • NGỌC EINSTEIN ⚡
        </span>
      </div>
    </AbsoluteFill>
  );
};
