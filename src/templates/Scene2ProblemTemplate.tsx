import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, ComparisonCard, SubtitleBox } from "../components";

export interface Scene2ProblemProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  title: string;
  badge?: string;
  icon?: string;
  blocks: Array<{ icon: string; title: string; description: string; badge?: string; isHighlight?: boolean }>;
}

export const Scene2ProblemTemplate: React.FC<Scene2ProblemProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  title,
  badge = "PROBLEM / TRAP",
  icon = "⚠️",
  blocks,
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
        <ComparisonCard
          title={title}
          icon={icon}
          badge={badge}
          blocks={blocks}
          borderColor="border-amber-500/50"
        />
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
