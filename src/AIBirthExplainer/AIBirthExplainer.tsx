import React from "react";
import {
  AbsoluteFill,
  Series,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { audioManifest } from "./audioData";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2AlanTuring } from "./scenes/Scene2AlanTuring";
import { Scene3FirstWinter } from "./scenes/Scene3FirstWinter";
import { Scene4Backprop } from "./scenes/Scene4Backprop";
import { Scene5AlexNetGpu } from "./scenes/Scene5AlexNetGpu";
import { Scene6Transformer } from "./scenes/Scene6Transformer";
import { Scene7EdgeAi } from "./scenes/Scene7EdgeAi";
import { Scene8Outro } from "./scenes/Scene8Outro";

export const AIBirthExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgShift = interpolate(
    frame,
    [0, durationInFrames],
    [0, 100],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-[#07080a] font-sans overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${25 + bgShift * 0.2}%, rgba(6, 182, 212, 0.25), transparent 60%),
                       radial-gradient(circle at 80% 75%, rgba(168, 85, 247, 0.25), transparent 55%),
                       radial-gradient(circle at 20% 85%, rgba(16, 185, 129, 0.2), transparent 50%)`,
        }}
      />

      <Series>
        {/* Scene 1: Hook */}
        <Series.Sequence durationInFrames={audioManifest.scenes[0].durationInFrames + 3}>
          <Scene1Hook />
        </Series.Sequence>

        {/* Scene 2: Alan Turing 1950 */}
        <Series.Sequence durationInFrames={audioManifest.scenes[1].durationInFrames + 3}>
          <Scene2AlanTuring />
        </Series.Sequence>

        {/* Scene 3: First Winter 1969 */}
        <Series.Sequence durationInFrames={audioManifest.scenes[2].durationInFrames + 3}>
          <Scene3FirstWinter />
        </Series.Sequence>

        {/* Scene 4: Backpropagation & Second Winter */}
        <Series.Sequence durationInFrames={audioManifest.scenes[3].durationInFrames + 3}>
          <Scene4Backprop />
        </Series.Sequence>

        {/* Scene 5: AlexNet & GPU 2012 */}
        <Series.Sequence durationInFrames={audioManifest.scenes[4].durationInFrames + 3}>
          <Scene5AlexNetGpu />
        </Series.Sequence>

        {/* Scene 6: Transformer & LLMs 2017 */}
        <Series.Sequence durationInFrames={audioManifest.scenes[5].durationInFrames + 3}>
          <Scene6Transformer />
        </Series.Sequence>

        {/* Scene 7: Edge AI & TinyML Revolution */}
        <Series.Sequence durationInFrames={audioManifest.scenes[6].durationInFrames + 3}>
          <Scene7EdgeAi />
        </Series.Sequence>

        {/* Scene 8: Outro & Synthesis */}
        <Series.Sequence durationInFrames={audioManifest.scenes[7].durationInFrames + 10}>
          <Scene8Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
