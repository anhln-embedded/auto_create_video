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
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[5].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-purple-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.4)]"
      >
        <span className="text-3xl">⚡</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-purple-300 uppercase">
          2017 - 2026: ĐỊA CHẤN TRANSFORMER &amp; CHATGPT
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-purple-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Breakthrough Paper: Attention Is All You Need */}
        <div className="rounded-2xl border-2 border-purple-500/40 bg-purple-950/30 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-white">GOOGLE (2017): ATTENTION IS ALL YOU NEED</span>
            <span className="text-xs font-mono text-purple-300 bg-purple-900/60 px-3 py-1 rounded">
              KIẾN TRÚC MỚI
            </span>
          </div>
          <div className="text-sm text-slate-200">
            Cơ chế <span className="text-purple-300 font-bold">Self-Attention</span> cho phép xử lý toàn bộ văn bản cùng một lúc, hiểu sâu ngữ cảnh đa chiều!
          </div>

          <div className="grid grid-cols-3 gap-3 mt-1">
            <div className="rounded-xl border border-purple-500/30 bg-slate-900/80 p-3 text-center">
              <span className="text-2xl">🤖</span>
              <div className="text-base font-bold text-white mt-1">ChatGPT</div>
              <div className="text-xs text-slate-400">OpenAI</div>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-slate-900/80 p-3 text-center">
              <span className="text-2xl">🔮</span>
              <div className="text-base font-bold text-white mt-1">Gemini</div>
              <div className="text-xs text-slate-400">Google</div>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-slate-900/80 p-3 text-center">
              <span className="text-2xl">🧠</span>
              <div className="text-base font-bold text-white mt-1">Claude</div>
              <div className="text-xs text-slate-400">Anthropic</div>
            </div>
          </div>
        </div>

        {/* The Huge Cost & Energy Trap */}
        <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🏭</span>
            <div>
              <div className="text-base font-bold text-amber-300">CÁI GIÁ ĐẮT ĐỎ CỦA SIÊU MÁY TÍNH CLOUD</div>
              <div className="text-sm text-slate-300">
                Tiêu thụ hàng trăm Megawatt điện &amp; hàng chục ngàn cạc GPU H100 ngốn tiền!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-500/30">
            NGỐN NĂNG LƯỢNG
          </span>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[5].text}
        durationInFrames={audioManifest.scenes[5].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
