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

export const Scene6Transformer: React.FC = () => {
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
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[5].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-purple-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.4)]"
        >
          <span className="text-4xl">⚡</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-purple-300 uppercase">
            2017 - 2026: ĐỊA CHẤN TRANSFORMER & CHATGPT
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Real Massive Datacenter Photo (Height ~590px) */}
        <div className="rounded-3xl border-2 border-purple-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
            <Img
              src={staticFile("images/ai_birth/datacenter_servers.jpg")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-base font-mono font-bold text-purple-300 bg-slate-950/90 px-3.5 py-1.5 rounded-xl border border-purple-500/40">
                GOOGLE 2017: TRANSFORMER
              </span>
              <span className="text-sm font-mono text-purple-200 bg-purple-950/90 px-3 py-1 rounded-lg border border-purple-500/30 font-bold">
                SELF-ATTENTION
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              ATTENTION IS ALL YOU NEED
            </h2>
            <p className="text-2xl text-purple-200 font-medium mt-2 leading-relaxed">
              Cơ chế Self-Attention cho phép mô hình nhìn toàn bộ câu văn cùng một lúc, mở toang cánh cửa cho các siêu trí tuệ LLMs ra đời!
            </p>
          </div>
        </div>

        {/* Card 2: AI Triad LLMs (Height ~470px) */}
        <div className="rounded-3xl border-2 border-purple-500/60 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
            <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              🤖 KỶ NGUYÊN MÔ HÌNH NGÔN NGỮ LỚN (LLMS)
            </span>
            <span className="text-sm font-mono text-purple-300 bg-purple-950 px-3.5 py-1.5 rounded-xl border border-purple-500/40 font-bold">
              100B+ PARAMS
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-purple-500/50 bg-purple-950/40 p-5 text-center">
              <span className="text-4xl">🤖</span>
              <div className="text-2xl font-black text-white mt-2">ChatGPT</div>
              <div className="text-sm text-purple-300 font-mono mt-1 font-bold">OpenAI</div>
              <div className="text-sm text-slate-300 mt-2">Giao tiếp toàn cầu</div>
            </div>

            <div className="rounded-2xl border-2 border-blue-500/50 bg-blue-950/40 p-5 text-center">
              <span className="text-4xl">🔮</span>
              <div className="text-2xl font-black text-white mt-2">Gemini</div>
              <div className="text-sm text-blue-300 font-mono mt-1 font-bold">Google Brain</div>
              <div className="text-sm text-slate-300 mt-2">Đa phương thức</div>
            </div>

            <div className="rounded-2xl border-2 border-amber-500/50 bg-amber-950/40 p-5 text-center">
              <span className="text-4xl">🧠</span>
              <div className="text-2xl font-black text-white mt-2">Claude</div>
              <div className="text-sm text-amber-300 font-mono mt-1 font-bold">Anthropic</div>
              <div className="text-sm text-slate-300 mt-2">Tư duy lập trình</div>
            </div>
          </div>
        </div>

        {/* Card 3: Energy Crisis Warning (Height ~280px) */}
        <div className="rounded-3xl border-2 border-amber-500/70 bg-amber-950/50 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(245,158,11,0.25)] flex items-center gap-7">
          <div className="text-7xl flex-shrink-0">⚡</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-black text-amber-300 uppercase">
                CÁI GIÁ ĐẮT ĐỎ CỦA DATA CENTER
              </div>
              <span className="text-sm font-mono text-amber-300 bg-amber-950 px-3.5 py-1.5 rounded-xl border border-amber-500/40 font-bold">
                GIỚI HẠN VẬT LÝ
              </span>
            </div>
            <p className="text-2xl text-slate-200 mt-2.5 leading-relaxed font-medium">
              Tiêu thụ hàng trăm Megawatt điện tương đương cả một thành phố! Không thể phụ thuộc mãi vào các cụm siêu máy tính ngốn điện!
            </p>
          </div>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[5].text}
        durationInFrames={audioManifest.scenes[5].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
