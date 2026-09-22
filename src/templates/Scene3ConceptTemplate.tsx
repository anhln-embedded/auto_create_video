import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, HardwareSpecCard, SpecItem, SubtitleBox } from "../components";

export interface Scene3ConceptProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  title: string;
  icon?: string;
  badge?: string;
  specs: SpecItem[];
  highlightText?: string;
}

export const Scene3ConceptTemplate: React.FC<Scene3ConceptProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  title,
  icon = "💡",
  badge = "CORE MECHANISM",
  specs,
  highlightText,
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
        <HardwareSpecCard
          title={title}
          icon={icon}
          badge={badge}
          specs={specs}
          borderColor="border-cyan-500/50"
          glowColor="rgba(6,182,212,0.25)"
        />

        {highlightText && (
          <div className="rounded-2xl border-2 border-cyan-500/40 bg-cyan-950/40 p-4 flex items-center gap-3 text-base text-cyan-200 shadow-lg">
            <span className="text-2xl">⚡</span>
            <span className="font-semibold text-white">{highlightText}</span>
          </div>
        )}
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
