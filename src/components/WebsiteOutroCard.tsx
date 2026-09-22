import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface WebsiteOutroCardProps {
  channelName?: string;
  websiteUrl?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  callToAction?: string;
  className?: string;
}

export const WebsiteOutroCard: React.FC<WebsiteOutroCardProps> = ({
  channelName = "Ngoc Einstein",
  websiteUrl = "https://embedded-aiot.com",
  badge = "HỆ THỐNG NHÚNG & AIOT",
  title = "Lộ Trình Đào Tạo Chuẩn R&D",
  subtitle = "Chuyên đề: STM32 • ESP32 • RTOS • Embedded Linux • TinyML",
  callToAction = "Thả tim & Follow kênh để xem thêm bài học nhé!",
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  const websiteSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 110 },
  });

  const ctaSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 110 },
  });

  const heartPulse = Math.sin(frame / 6) * 0.15 + 1;

  return (
    <div
      style={{ transform: `scale(${cardScale})` }}
      className={`flex w-full max-w-[1020px] flex-col items-center gap-6 rounded-3xl border-2 border-orange-500/40 bg-slate-950/95 p-8 shadow-[0_0_90px_rgba(240,90,40,0.35)] backdrop-blur-2xl text-center ${className}`}
    >
      {/* Top Brand Badge */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 border-2 border-orange-400 p-1 shadow-[0_0_15px_rgba(240,90,40,0.6)] text-white text-xl font-black shrink-0">
          ⚡
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-6 py-2">
          <span className="font-heading text-xl font-extrabold tracking-wider text-orange-400 uppercase">
            {badge}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="font-heading text-5xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(240,90,40,0.25)]">
          {title}
        </h2>
        <p className="font-sans text-2xl font-semibold text-slate-300">
          {subtitle}
        </p>
      </div>

      {/* Prominent Website Link Box */}
      <div
        style={{ transform: `scale(${websiteSpring})` }}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-orange-950/60 p-5 shadow-[0_0_40px_rgba(6,182,212,0.3)]"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 border border-orange-500/40 p-2 shadow-inner text-3xl">
            🚀
          </div>
          <div className="text-left min-w-0">
            <span className="font-heading text-lg font-bold text-cyan-300 uppercase tracking-wider block">
              Trang thông tin &amp; Khóa học:
            </span>
            <p className="font-mono text-3xl font-black text-white tracking-wide truncate">
              {websiteUrl.replace("https://", "")}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-cyan-500 px-6 py-3 font-heading text-xl font-black tracking-wider text-slate-950 shadow-md whitespace-nowrap">
          HỌC NGAY →
        </div>
      </div>

      {/* CTA Follow Button */}
      <div
        style={{ transform: `scale(${ctaSpring})` }}
        className="flex items-center gap-5 rounded-full border-2 border-orange-500/60 bg-gradient-to-r from-orange-500/30 via-amber-500/20 to-orange-500/30 px-10 py-4 shadow-[0_0_40px_rgba(240,90,40,0.4)]"
      >
        <span style={{ transform: `scale(${heartPulse})` }} className="text-4xl inline-block">
          ❤️
        </span>
        <span className="font-heading text-3xl font-black tracking-tight text-white">
          {callToAction}
        </span>
      </div>

      {/* Sub-footer attribution */}
      <span className="font-sans text-lg font-medium text-slate-400">
        Kênh chia sẻ của <strong className="text-orange-400 font-bold">{channelName}</strong> • embedded-aiot.com
      </span>
    </div>
  );
};
