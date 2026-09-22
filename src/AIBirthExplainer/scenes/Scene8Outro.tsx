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
import { BrandHeader, SubtitleBox, WebsiteOutroCard } from "../../components/embedded";
import { audioManifest } from "../audioData";

export const Scene8Outro: React.FC = () => {
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
      <Audio src={staticFile(audioManifest.scenes[7].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-amber-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.4)]"
        >
          <span className="text-4xl">🏆</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-amber-300 uppercase">
            TỔNG KẾT: THUẬT TOÁN + CHIP SILICON
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: 70-Year Timeline & Grand Truth (Height ~560px) */}
        <div className="rounded-3xl border-2 border-amber-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <span className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
              📜 DÒNG THỜI GIAN 70 NĂM LỊCH SỬ AI
            </span>
            <span className="text-sm font-mono text-amber-300 bg-amber-950 px-3.5 py-1.5 rounded-xl border border-amber-500/40 font-bold">
              1950 ➔ 2026
            </span>
          </div>

          {/* Timeline Milestones */}
          <div className="grid grid-cols-5 gap-3 my-4">
            <div className="rounded-xl bg-slate-900 p-3 text-center border border-blue-500/40">
              <div className="text-xs font-mono text-blue-300 font-bold">1950</div>
              <div className="text-sm font-black text-white mt-1">Turing</div>
              <div className="text-[11px] text-slate-400">Câu hỏi lớn</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 text-center border border-rose-500/40">
              <div className="text-xs font-mono text-rose-300 font-bold">1969</div>
              <div className="text-sm font-black text-white mt-1">Minsky</div>
              <div className="text-[11px] text-rose-300">Bẫy XOR</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 text-center border border-emerald-500/40">
              <div className="text-xs font-mono text-emerald-300 font-bold">1986</div>
              <div className="text-sm font-black text-white mt-1">Hinton</div>
              <div className="text-[11px] text-slate-400">Backprop</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 text-center border border-emerald-500/40">
              <div className="text-xs font-mono text-emerald-300 font-bold">2012</div>
              <div className="text-sm font-black text-white mt-1">GPU</div>
              <div className="text-[11px] text-emerald-300">AlexNet</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 text-center border border-cyan-500/50">
              <div className="text-xs font-mono text-cyan-300 font-bold">2026</div>
              <div className="text-sm font-black text-white mt-1">Edge AI</div>
              <div className="text-[11px] text-cyan-300">TinyML</div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-950/40 border border-amber-500/40 p-4 text-center">
            <p className="text-2xl font-black text-amber-300">
              💡 BẢN CHẤT CỦA AI: THUẬT TOÁN TOÁN HỌC + SỨC MẠNH CHIP BÁN DẪN!
            </p>
          </div>
        </div>

        {/* Card 2: WebsiteOutroCard (Height ~780px) */}
        <div className="rounded-3xl border-2 border-amber-500/50 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-center">
          <WebsiteOutroCard
            title="LÀM CHỦ LẬP TRÌNH NHÚNG & EDGE AI THỰC CHIẾN"
            subtitle="Học chuyên sâu từ kiến trúc vi điều khiển STM32, ESP32, FreeRTOS đến triển khai mô hình TinyML trên phần cứng thực tế tại embedded-aiot.com"
            callToAction="THẢ TIM, CHIA SẺ & THEO DÕI KÊNH NGỌC EINSTEIN"
            websiteUrl="https://embedded-aiot.com"
          />
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[7].text}
        durationInFrames={audioManifest.scenes[7].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
