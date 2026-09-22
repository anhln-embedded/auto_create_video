import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox } from "../components";

export interface ImpactCardItem {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
  isHighlight?: boolean;
}

export interface Scene5ImpactProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  title: string;
  badge?: string;
  icon?: string;
  cards: ImpactCardItem[];
  footerTip?: string;
}

export const Scene5ImpactTemplate: React.FC<Scene5ImpactProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  title,
  badge = "INDUSTRY STANDARD",
  icon = "🏛️",
  cards,
  footerTip,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    from: 30,
    to: 0,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-52 px-6 text-white">
      <Audio src={staticFile(audioPath)} />
      <BrandHeader />

      <div
        style={{ transform: `translateY(${entrance}px)` }}
        className="w-full max-w-[1020px] flex flex-col gap-5 mt-3"
      >
        {/* Section Header */}
        <div className="rounded-3xl border-2 border-emerald-500/50 bg-slate-900/95 px-7 py-4 backdrop-blur-xl flex items-center justify-between shadow-[0_0_35px_rgba(16,185,129,0.25)]">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{icon}</span>
            <span className="font-heading text-2xl font-black text-emerald-300 uppercase tracking-wide">
              {title}
            </span>
          </div>
          <span className="rounded-xl bg-emerald-500/25 border border-emerald-400/40 px-3.5 py-1.5 font-mono text-sm font-black text-emerald-300">
            {badge}
          </span>
        </div>

        {/* Vertical Cards */}
        <div className="flex flex-col gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border-2 p-6 flex items-start gap-5 shadow-xl ${
                card.isHighlight
                  ? "border-emerald-500/50 bg-slate-950/95 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  : "border-slate-800 bg-slate-950/95"
              }`}
            >
              <span className="text-5xl flex-shrink-0">{card.icon}</span>
              <div className="flex flex-col gap-1.5 flex-grow">
                <div className="flex items-center justify-between">
                  <span className={`text-xl font-black ${card.isHighlight ? "text-emerald-200" : "text-white"}`}>
                    {card.title}
                  </span>
                  {card.tag && (
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {card.tag}
                    </span>
                  )}
                </div>
                <p className="text-base text-slate-300 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Advice */}
        {footerTip && (
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/40 p-4 flex items-center gap-4 text-base text-emerald-200 shadow-lg">
            <span className="text-3xl">✅</span>
            <span className="font-semibold leading-relaxed">{footerTip}</span>
          </div>
        )}
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
