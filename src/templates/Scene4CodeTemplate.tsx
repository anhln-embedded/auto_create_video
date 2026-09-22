import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, CodeBlockCard, SubtitleBox } from "../components";

export interface Scene4CodeProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  sectionTitle: string;
  sectionBadge?: string;
  sectionIcon?: string;
  filename?: string;
  badge?: string;
  codeContent: React.ReactNode;
  takeaway?: string;
  takeawayBadge?: string;
}

export const Scene4CodeTemplate: React.FC<Scene4CodeProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  sectionTitle,
  sectionBadge = "CODE C / FIRMWARE",
  sectionIcon = "💻",
  filename = "firmware_main.c",
  badge = "PRACTICAL C",
  codeContent,
  takeaway,
  takeawayBadge = "SENIOR TIP",
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
        <div className="rounded-3xl border-2 border-indigo-500/50 bg-slate-900/95 px-7 py-4 backdrop-blur-xl flex items-center justify-between shadow-[0_0_35px_rgba(99,102,241,0.25)]">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{sectionIcon}</span>
            <span className="font-heading text-2xl font-black text-indigo-300 uppercase tracking-wide">
              {sectionTitle}
            </span>
          </div>
          <span className="rounded-xl bg-indigo-500/25 border border-indigo-400/40 px-3.5 py-1.5 font-mono text-sm font-black text-indigo-300">
            {sectionBadge}
          </span>
        </div>

        {/* Code Visual Card */}
        <CodeBlockCard
          filename={filename}
          badge={badge}
          fontSize="text-[23px]"
          lineHeight="leading-[1.65]"
          takeaway={takeaway}
          takeawayBadge={takeawayBadge}
          borderColor="border-indigo-500/50"
        >
          {codeContent}
        </CodeBlockCard>
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
