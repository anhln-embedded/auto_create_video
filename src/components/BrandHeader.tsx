import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BrandHeaderProps {
  channelName?: string;
  websiteTag?: string;
  top?: string | number;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  channelName = "Ngoc Einstein",
  websiteTag = "EMBEDDED-AIOT.COM",
  top = "140px",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
      }}
      className="z-50 flex items-center gap-4 rounded-full border border-orange-500/40 bg-slate-950/90 px-6 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(240,90,40,0.3)] backdrop-blur-2xl whitespace-nowrap select-none"
    >
      {/* Channel Icon Badge */}
      <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 border-2 border-orange-400 shadow-[0_0_15px_rgba(240,90,40,0.6)] text-white text-xl font-black">
        ⚡
      </div>

      {/* Brand Channel Name */}
      <span className="flex-shrink-0 whitespace-nowrap font-heading text-3xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(240,90,40,0.3)]">
        {channelName}
      </span>

      {/* Divider */}
      <div className="flex-shrink-0 h-6 w-[2px] bg-slate-700/80" />

      {/* Website Domain Tag */}
      <div className="flex-shrink-0 flex items-center gap-2 rounded-full bg-cyan-950/80 border border-cyan-400/50 px-4 py-1.5 whitespace-nowrap">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <span className="whitespace-nowrap font-mono text-xl font-bold tracking-wider text-cyan-300">
          {websiteTag}
        </span>
      </div>
    </div>
  );
};
