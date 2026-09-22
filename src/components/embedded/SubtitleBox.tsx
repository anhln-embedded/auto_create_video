import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface WordTimestamp {
  text: string;
  startSec?: number;
  endSec?: number;
  startFrame: number;
  endFrame: number;
}

export interface ChunkWithTimestamps {
  words: WordTimestamp[];
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SubtitleBoxProps {
  text?: string;
  chunks?: ChunkWithTimestamps[];
  durationInFrames?: number;
  highlightKeyword?: string;
  className?: string;
  bottom?: string | number;
  fontSize?: string;
  highlightColor?: string;
}

// Fallback heuristic weight calculation if timestamps are not provided
function getWordWeight(word: string): number {
  let weight = Math.max(2, word.length);
  if (/\d+/.test(word)) weight += 12;
  else if (/^[A-Z]{2,}/.test(word)) weight += 6;
  if (/[.!?]$/.test(word)) weight += 14;
  else if (/[,;:]$/.test(word)) weight += 7;
  return weight;
}

function chunkTextIntelligently(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    currentChunk.push(word);

    const hasPunctuationEnd = /[.!?]$/.test(word);
    const hasCommaEnd = /[,;:]$/.test(word);
    const isLongEnough = currentChunk.length >= 5;
    const isMaxLimit = currentChunk.length >= 7;

    if (hasPunctuationEnd || (isLongEnough && hasCommaEnd) || isMaxLimit || i === words.length - 1) {
      chunks.push(currentChunk.join(" "));
      currentChunk = [];
    }
  }

  return chunks.length > 0 ? chunks : [text];
}

export const SubtitleBox: React.FC<SubtitleBoxProps> = ({
  text = "",
  chunks,
  durationInFrames,
  highlightKeyword,
  bottom = "380px",
  fontSize = "text-[38px] font-black",
  highlightColor = "text-amber-300",
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  // -------------------------------------------------------------
  // MODE 1: 100% Exact Millisecond WordBoundary Timestamps (Ground Truth)
  // -------------------------------------------------------------
  if (chunks && chunks.length > 0) {
    let activeChunkIndex = chunks.findIndex(
      (c) => frame >= c.startFrame && frame <= c.endFrame
    );

    if (activeChunkIndex === -1) {
      if (frame < chunks[0].startFrame) {
        activeChunkIndex = 0;
      } else {
        activeChunkIndex = chunks.length - 1;
      }
    }

    const currentChunk = chunks[activeChunkIndex];
    const words = currentChunk.words;
    const chunkRelativeFrame = Math.max(0, frame - currentChunk.startFrame);

    const opacity = interpolate(
      chunkRelativeFrame,
      [0, 2],
      [0.85, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

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
        <div className="flex items-center gap-3.5 rounded-full border border-orange-500/60 bg-slate-950/95 px-7 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(240,90,40,0.35)] backdrop-blur-2xl max-w-[960px]">
          <div className="relative flex items-center justify-center">
            <span className="text-3xl select-none">🎙️</span>
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(240,90,40,0.95)]" />
          </div>

          <p className={`font-heading ${fontSize} tracking-tight whitespace-nowrap leading-none flex items-center`}>
            {words.map((w, idx) => {
              const isSpokenNow = frame >= w.startFrame && frame <= w.endFrame;
              const isSpokenPast = frame > w.endFrame;
              const isKeyword =
                highlightKeyword &&
                w.text.toLowerCase().includes(highlightKeyword.toLowerCase());

              return (
                <span
                  key={idx}
                  className={`inline-block px-2.5 py-1 rounded-xl border transition-colors duration-100 mx-1 ${
                    isSpokenNow
                      ? `border-amber-400/80 bg-amber-400/25 ${highlightColor} drop-shadow-[0_0_18px_rgba(251,191,36,0.95)] scale-105`
                      : isSpokenPast
                      ? isKeyword
                        ? `border-transparent ${highlightColor} drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]`
                        : "border-transparent text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      : "border-transparent text-white/30"
                  }`}
                >
                  {w.text}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MODE 2: Fallback Heuristic Estimation (if timestamps not supplied)
  // -------------------------------------------------------------
  const rawDuration = durationInFrames ?? config.durationInFrames;
  const effectiveDuration = Math.max(30, rawDuration - 10);

  const fallbackChunks = chunkTextIntelligently(text);

  const chunkWeights = fallbackChunks.map((chunk) => {
    const wordsInChunk = chunk.split(" ");
    return wordsInChunk.reduce((sum, w) => sum + getWordWeight(w), 0);
  });
  const totalWeight = chunkWeights.reduce((a, b) => a + b, 0);

  let accumulatedChunkFrames = 0;
  const chunkTimeRanges = chunkWeights.map((w) => {
    const chunkDuration = (w / totalWeight) * effectiveDuration;
    const start = accumulatedChunkFrames;
    const end = accumulatedChunkFrames + chunkDuration;
    accumulatedChunkFrames += chunkDuration;
    return { start, end, duration: chunkDuration };
  });

  let currentChunkIndex = chunkTimeRanges.findIndex(
    (range) => frame >= range.start && frame < range.end
  );
  if (currentChunkIndex === -1) {
    currentChunkIndex = frame >= effectiveDuration ? fallbackChunks.length - 1 : 0;
  }

  const activeChunkText = fallbackChunks[currentChunkIndex] || "";
  const currentRange = chunkTimeRanges[currentChunkIndex];
  const chunkRelativeFrame = Math.max(0, frame - currentRange.start);
  const currentChunkDuration = currentRange.duration;

  const opacity = interpolate(
    chunkRelativeFrame,
    [0, 2],
    [0.85, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const words = activeChunkText.split(" ");
  const wordWeights = words.map((w) => getWordWeight(w));
  const chunkWordTotalWeight = wordWeights.reduce((acc, w) => acc + w, 0);

  let accumulatedWordFrames = 0;
  const wordTimeRanges = wordWeights.map((w) => {
    const wordDuration = (w / chunkWordTotalWeight) * currentChunkDuration;
    const start = accumulatedWordFrames;
    const end = accumulatedWordFrames + wordDuration;
    accumulatedWordFrames += wordDuration;
    return { start, end };
  });

  let activeWordIndex = wordTimeRanges.findIndex(
    (range) => chunkRelativeFrame >= range.start && chunkRelativeFrame < range.end
  );
  if (activeWordIndex === -1) {
    activeWordIndex = chunkRelativeFrame >= currentChunkDuration ? words.length - 1 : 0;
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
      <div className="flex items-center gap-4 rounded-full border border-orange-500/60 bg-slate-950/95 px-9 py-4 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(240,90,40,0.35)] backdrop-blur-2xl">
        <div className="relative flex items-center justify-center">
          <span className="text-3xl select-none">🎙️</span>
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(240,90,40,0.95)]" />
        </div>

        <p className={`font-heading ${fontSize} tracking-tight whitespace-nowrap leading-none flex items-center`}>
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
                    ? `border-amber-400/80 bg-amber-400/25 ${highlightColor} drop-shadow-[0_0_18px_rgba(251,191,36,0.95)] scale-105`
                    : isSpokenPast
                    ? isKeyword
                      ? `border-transparent ${highlightColor} drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]`
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
