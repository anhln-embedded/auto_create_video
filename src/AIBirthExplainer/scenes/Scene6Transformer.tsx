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

export const Scene6Transformer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[5].durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[5].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/datacenter_servers.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, rgba(168, 85, 247, 0.25), transparent 60%),
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
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-purple-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(168,85,247,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">⚡</span>
        <span className="font-heading text-2xl font-black tracking-wider text-purple-300 uppercase">
          2017 - 2026 • ĐỊA CHẤN TRANSFORMER & CHATGPT
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: Massive Datacenter Photo Banner (Height ~470px) */}
        <div className="rounded-3xl border-3 border-purple-400/80 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.35)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-xl">
            <Img
              src={staticFile("images/ai_birth/datacenter_servers.jpg")}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${imgZoom})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-base font-mono font-bold text-purple-300 bg-slate-950/90 px-3.5 py-1 rounded-xl border border-purple-500/40">
                GOOGLE BRAIN 2017: TRANSFORMER
              </span>
              <span className="text-sm font-mono text-purple-200 bg-purple-950/90 px-3 py-1 rounded-lg border border-purple-500/30 font-bold">
                SELF-ATTENTION
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="font-heading text-4xl font-black text-white leading-tight">
              ATTENTION IS ALL YOU NEED
            </h2>
            <p className="text-2xl text-purple-200 font-medium mt-1 leading-relaxed">
              Cơ chế Self-Attention xử lý ngôn ngữ song song toàn diện ➔ Mở toang cánh cửa cho kỷ nguyên siêu trí tuệ LLMs bùng nổ!
            </p>
          </div>
        </div>

        {/* Bottom: The LLM Triad Arena (Height ~300px) */}
        <div className="rounded-3xl border-3 border-purple-400/80 bg-slate-950/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
            <span className="text-2xl font-black text-white uppercase">
              🤖 KỶ NGUYÊN MÔ HÌNH NGÔN NGỮ LỚN (LLMS)
            </span>
            <span className="text-sm font-mono text-purple-300 bg-purple-950 px-3 py-1 rounded-lg border border-purple-500/40 font-bold">
              100B+ PARAMS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="rounded-2xl border-2 border-purple-500/50 bg-purple-950/40 p-4 text-center">
              <span className="text-4xl">🤖</span>
              <div className="text-2xl font-black text-white mt-1">ChatGPT</div>
              <div className="text-xs text-purple-300 font-mono font-bold">OpenAI</div>
            </div>

            <div className="rounded-2xl border-2 border-blue-500/50 bg-blue-950/40 p-4 text-center">
              <span className="text-4xl">🔮</span>
              <div className="text-2xl font-black text-white mt-1">Gemini</div>
              <div className="text-xs text-blue-300 font-mono font-bold">Google DeepMind</div>
            </div>

            <div className="rounded-2xl border-2 border-amber-500/50 bg-amber-950/40 p-4 text-center">
              <span className="text-4xl">🧠</span>
              <div className="text-2xl font-black text-white mt-1">Claude</div>
              <div className="text-xs text-amber-300 font-mono font-bold">Anthropic</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-purple-400 bg-purple-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(168,85,247,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🌐</span>
          <div>
            <div className="text-sm font-mono text-purple-300 font-bold uppercase">TRÍ TUỆ NHÂN LOẠI</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Đọc hiểu & suy luận như con người!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-amber-400 bg-amber-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(245,158,11,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">⚡</span>
          <div>
            <div className="text-sm font-mono text-amber-300 font-bold uppercase">CẢNH BÁO NĂNG LƯỢNG</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Ngốn điện bằng cả một thành phố!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: High-Retention Kinetic Subtitles (100% Frame-Perfect WordBoundary) */}
      <SubtitleBox
        chunks={subtitlesData[5].chunks}
        text={audioManifest.scenes[5].text}
        durationInFrames={audioManifest.scenes[5].durationInFrames}
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
