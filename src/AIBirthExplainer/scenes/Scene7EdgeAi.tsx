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

export const Scene7EdgeAi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[6].durationInFrames], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[6].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Img
          src={staticFile("images/ai_birth/stm32_microcontroller.jpg")}
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.25), transparent 60%),
                         radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.2), transparent 70%),
                         linear-gradient(to bottom, rgba(7,8,10,0.92) 0%, rgba(7,8,10,0.55) 45%, rgba(7,8,10,0.88) 100%)`,
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
        <span className="text-3xl">🔮</span>
        <span className="font-heading text-2xl font-black tracking-wider text-cyan-300 uppercase">
          2026+ • ĐỈNH CHÓP EDGE AI & TINYML
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: Dual Macro Real Silicon Chips Showcase (Height ~470px) */}
        <div className="rounded-3xl border-3 border-cyan-400/80 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.35)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
            <span className="text-2xl font-black text-white uppercase tracking-wide">
              ⚡ AI RỜI ĐÁM MÂY: CHẠY TRỰC TIẾP TRÊN PHẦN CỨNG
            </span>
            <span className="text-sm font-mono text-cyan-300 bg-cyan-950/90 px-3.5 py-1 rounded-xl border border-cyan-500/40 font-bold">
              TINYML ON SILICON
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5 my-3">
            {/* Left: STM32 Microcontroller */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl bg-slate-900 flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Img
                  src={staticFile("images/ai_birth/stm32_microcontroller.jpg")}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${imgZoom})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 text-xs font-mono font-bold text-cyan-300 bg-slate-950/90 px-3 py-1 rounded-lg border border-cyan-500/40">
                  STM32 H7 / NPU
                </span>
              </div>
              <div className="p-3 bg-slate-950/90 flex flex-col">
                <div className="text-xl font-black text-cyan-300">STM32 NPU NHÚNG</div>
                <div className="text-sm text-slate-300 mt-0.5">Nhận diện hình ảnh & giọng nói offline 100%</div>
              </div>
            </div>

            {/* Right: ESP32 IoT Module */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl bg-slate-900 flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Img
                  src={staticFile("images/ai_birth/esp32_iot.jpg")}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${imgZoom})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 text-xs font-mono font-bold text-emerald-300 bg-slate-950/90 px-3 py-1 rounded-lg border border-emerald-500/40">
                  ESP32-S3 AI
                </span>
              </div>
              <div className="p-3 bg-slate-950/90 flex flex-col">
                <div className="text-xl font-black text-emerald-300">ESP32-S3 TINYML</div>
                <div className="text-sm text-slate-300 mt-0.5">Xử lý AI thông minh tiêu thụ chỉ vài miliwatt (mW)</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-cyan-950/40 border border-cyan-500/40 py-2.5 px-4 text-center">
            <span className="text-2xl font-black text-cyan-200">
              💡 Mô hình AI nén 100x • Nhỏ bằng móng tay • Không cần Internet!
            </span>
          </div>
        </div>

        {/* Bottom: Cloud AI vs Edge AI Matrix (Height ~300px) */}
        <div className="rounded-3xl border-3 border-emerald-400/80 bg-slate-950/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
            <span className="text-2xl font-black text-white uppercase">
              ⚖️ CLOUD AI VS EDGE AI: TẠI SAO BẮT BUỘC PHẢI DÙNG EDGE?
            </span>
            <span className="text-sm font-mono text-emerald-300 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-500/40 font-bold">
              REAL-TIME
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-950/40 p-3 text-center">
              <span className="text-3xl">⚡</span>
              <div className="text-xl font-black text-white mt-1">ĐỘ TRỄ ~0MS</div>
              <div className="text-xs text-emerald-300 font-mono font-bold mt-1">Phản ứng tức thì</div>
            </div>

            <div className="rounded-2xl border-2 border-cyan-500/50 bg-cyan-950/40 p-3 text-center">
              <span className="text-3xl">🔋</span>
              <div className="text-xl font-black text-white mt-1">VÀI MILIWATT</div>
              <div className="text-xs text-cyan-300 font-mono font-bold mt-1">Pin chạy cả năm</div>
            </div>

            <div className="rounded-2xl border-2 border-purple-500/50 bg-purple-950/40 p-3 text-center">
              <span className="text-3xl">🔒</span>
              <div className="text-xl font-black text-white mt-1">BẢO MẬT 100%</div>
              <div className="text-xs text-purple-300 font-mono font-bold mt-1">Dữ liệu không rời chip</div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-cyan-400 bg-cyan-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(6,182,212,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🚗</span>
          <div>
            <div className="text-sm font-mono text-cyan-300 font-bold uppercase">XE TỰ HÀNH & DRONE</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Xử lý vật cản tức thời, không thể đợi mạng Cloud!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(16,185,129,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">🩺</span>
          <div>
            <div className="text-sm font-mono text-emerald-300 font-bold uppercase">THIẾT BỊ ĐEO Y TẾ</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Theo dõi nhịp tim 24/7 với năng lượng siêu tiết kiệm!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: Kinetic Karaoke Subtitles (100% Frame-Perfect WordBoundary) */}
      <SubtitleBox
        chunks={subtitlesData[6].chunks}
        text={audioManifest.scenes[6].text}
        durationInFrames={audioManifest.scenes[6].durationInFrames}
        bottom="380px"
        highlightColor="text-cyan-400"
      />

      {/* Bottom Ambient Glow */}
      <div className="absolute bottom-0 inset-x-0 h-[360px] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-0" />
    </AbsoluteFill>
  );
};
