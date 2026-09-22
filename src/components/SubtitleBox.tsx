import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface SubtitleBoxProps {
  text: string;
  durationInFrames: number;
  highlightKeyword?: string;
  bottom?: string | number;
}

function chunkText(text: string, wordsPerChunk = 6): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(" "));
  }

  return chunks.length > 0 ? chunks : [text];
}

export const SubtitleBox: React.FC<SubtitleBoxProps> = ({
  text,
  durationInFrames,
  highlightKeyword,
  bottom = "160px",
}) => {
  const frame = useCurrentFrame();

  const chunks = chunkText(text, 6);
  const totalChunks = chunks.length;
  const framesPerChunk = durationInFrames / totalChunks;

  const currentChunkIndex = Math.min(
    Math.floor(frame / framesPerChunk),
    totalChunks - 1
  );

  const activeChunkText = chunks[currentChunkIndex] || "";
  const chunkStartFrame = currentChunkIndex * framesPerChunk;
  const chunkRelativeFrame = frame - chunkStartFrame;

  const opacity = interpolate(
    chunkRelativeFrame,
    [0, 2],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const words = activeChunkText.split(" ");
  const wordWeights = words.map((w) => Math.max(2, w.length));
  const totalWeight = wordWeights.reduce((acc, w) => acc + w, 0);

  let accumulatedFrames = 0;
  const wordTimeRanges = wordWeights.map((weight) => {
    const wordDuration = (weight / totalWeight) * framesPerChunk;
    const start = accumulatedFrames;
    const end = accumulatedFrames + wordDuration;
    accumulatedFrames += wordDuration;
    return { start, end };
  });

  let activeWordIndex = wordTimeRanges.findIndex(
    (range) => chunkRelativeFrame >= range.start && chunkRelativeFrame < range.end
  );
  if (activeWordIndex === -1) {
    activeWordIndex = chunkRelativeFrame >= framesPerChunk ? words.length - 1 : 0;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
      }}
      className="z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="flex items-center gap-4 rounded-full border border-orange-500/50 bg-slate-950/95 px-8 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(240,90,40,0.3)] backdrop-blur-2xl">
        <div className="relative flex items-center justify-center">
          <span className="text-3xl select-none">🎙️</span>
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(240,90,40,0.9)]" />
        </div>

        <p className="font-heading text-4xl font-black tracking-tight whitespace-nowrap leading-none flex items-center">
          {words.map((word, idx) => {
            const isSpokenNow = idx === activeWordIndex;
            const isSpokenPast = idx < activeWordIndex;
            const isKeyword =
              highlightKeyword &&
              word.toLowerCase().includes(highlightKeyword.toLowerCase());

            return (
              <span
                key={idx}
                className={`inline-block px-2.5 py-1 rounded-xl border transition-colors duration-100 mx-1 ${
                  isSpokenNow
                    ? "border-amber-400/80 bg-amber-400/25 text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.95)]"
                    : isSpokenPast
                    ? isKeyword
                      ? "border-transparent text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                      : "border-transparent text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    : "border-transparent text-white/30"
                }`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
