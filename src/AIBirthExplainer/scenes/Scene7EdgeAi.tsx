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

export const Scene7EdgeAi: React.FC = () => {
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
      <Audio src={staticFile(audioManifest.scenes[6].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.4)]"
        >
          <span className="text-4xl">🔮</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-cyan-300 uppercase">
            TƯƠNG LAI: KỶ NGUYÊN EDGE AI & TINYML
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Real Hardware Silicon Chips (Height ~590px) */}
        <div className="rounded-3xl border-2 border-cyan-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-5">
            {/* Left: STM32 Microcontroller */}
            <div className="rounded-2xl border-2 border-cyan-500/50 bg-slate-900/90 p-4 flex flex-col gap-3">
              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-cyan-400/50 shadow-xl">
                <Img
                  src={staticFile("images/ai_birth/stm32_microcontroller.jpg")}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-xs font-mono bg-slate-950/90 px-3 py-1 rounded-lg text-cyan-300 font-bold border border-cyan-500/40">
                  STM32 H7 / NPU
                </span>
              </div>
              <div className="text-xl font-black text-white">STM32 NPU NHÚNG</div>
              <div className="text-base text-slate-300">Nhận diện hình ảnh & âm thanh offline 100%</div>
            </div>

            {/* Right: ESP32 IoT Module */}
            <div className="rounded-2xl border-2 border-emerald-500/50 bg-slate-900/90 p-4 flex flex-col gap-3">
              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-emerald-400/50 shadow-xl">
                <Img
                  src={staticFile("images/ai_birth/esp32_iot.jpg")}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-xs font-mono bg-slate-950/90 px-3 py-1 rounded-lg text-emerald-300 font-bold border border-emerald-500/40">
                  ESP32-S3 AI
                </span>
              </div>
              <div className="text-xl font-black text-white">ESP32-S3 TINYML</div>
              <div className="text-base text-slate-300">Xử lý AI giọng nói & cảm biến chỉ vài miliwatt</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyan-500/30 flex items-center justify-between">
            <span className="text-2xl font-bold text-cyan-300">
              ⚡ Đưa trí tuệ nhân tạo trực tiếp vào chip bán dẫn
            </span>
            <span className="text-base font-mono text-slate-300 bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-700 font-semibold">
              TINYML REVOLUTION
            </span>
          </div>
        </div>

        {/* Card 2: Cloud AI vs Edge AI Battle Matrix (Height ~470px) */}
        <div className="rounded-3xl border-2 border-cyan-500/60 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
            <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              ⚡ SO SÁNH: CLOUD AI VS EDGE AI
            </span>
            <span className="text-sm font-mono text-cyan-300 bg-cyan-950 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 font-bold">
              ĐỘ TRỄ 0 MS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl border-2 border-slate-700 bg-slate-900/90 p-5">
              <div className="text-lg font-mono text-slate-400 font-bold">CLOUD AI (ĐÁM MÂY)</div>
              <div className="text-2xl font-black text-rose-300 mt-2">Trễ 1 - 2 giây</div>
              <p className="text-base text-slate-400 mt-2">
                Phụ thuộc mạng Internet, máy chủ ngốn điện, nguy cơ lộ bảo mật dữ liệu.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-950/90 p-5 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <div className="text-lg font-mono text-emerald-300 font-bold">EDGE AI (TẠI THIẾT BỊ)</div>
              <div className="text-2xl font-black text-emerald-300 mt-2">&lt; 1 mili-giây (Tức thì)</div>
              <p className="text-base text-emerald-200 mt-2 font-medium">
                Chạy offline 100%, bảo mật tuyệt đối, tiết kiệm điện năng gấp 1,000 lần!
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Mission Critical Safety Banner (Height ~280px) */}
        <div className="rounded-3xl border-2 border-cyan-500/70 bg-cyan-950/50 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(6,182,212,0.25)] flex items-center gap-7">
          <div className="text-7xl flex-shrink-0">🚗</div>
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-black text-cyan-200 uppercase">
              TẠI SAO BẮT BUỘC PHẢI LÀ EDGE AI?
            </div>
            <p className="text-2xl text-slate-100 mt-2.5 leading-relaxed font-medium">
              Xe tự hành phanh khẩn cấp, flycam tránh vật cản, cảm biến y tế: <span className="text-cyan-300 font-bold">Một mili-giây mất mạng là tính mạng con người</span>!
            </p>
          </div>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[6].text}
        durationInFrames={audioManifest.scenes[6].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
