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
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[7].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-amber-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(245,158,11,0.4)]"
      >
        <span className="text-3xl">🏆</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-amber-300 uppercase">
          TỔNG KẾT: THUẬT TOÁN + CHIP SILICON
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-amber-500/40 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        <WebsiteOutroCard
          title="LÀM CHỦ LẬP TRÌNH NHÚNG &amp; EDGE AI THỰC CHIẾN"
          subtitle="Khóa học chuyên sâu từ vi điều khiển STM32, ESP32, FreeRTOS đến TinyML tại embedded-aiot.com"
          callToAction="THẢ TIM, CHIA SẺ &amp; THEO DÕI KÊNH NGỌC EINSTEIN"
          websiteUrl="https://embedded-aiot.com"
        />
      </div>

      <SubtitleBox
        text={audioManifest.scenes[7].text}
        durationInFrames={audioManifest.scenes[7].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
