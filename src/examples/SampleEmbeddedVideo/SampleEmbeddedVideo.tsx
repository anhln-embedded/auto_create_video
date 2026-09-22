import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { audioManifest } from "./audioData";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Bitfield } from "./scenes/Scene2Bitfield";
import { Scene3Enum } from "./scenes/Scene3Enum";
import { Scene4Union } from "./scenes/Scene4Union";
import { Scene5Impact } from "./scenes/Scene5Impact";
import { Scene6Outro } from "./scenes/Scene6Outro";

export const SampleEmbeddedVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgShift = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-950 font-sans overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${25 + bgShift * 0.2}%, rgba(99, 102, 241, 0.25), transparent 60%),
                       radial-gradient(circle at 80% 75%, rgba(6, 182, 212, 0.25), transparent 55%),
                       radial-gradient(circle at 20% 85%, rgba(16, 185, 129, 0.2), transparent 50%)`,
        }}
      />

      <Series>
        {/* Scene 1: Hook */}
        <Series.Sequence durationInFrames={audioManifest.scenes[0].durationInFrames + 3}>
          <Scene1Hook />
        </Series.Sequence>

        {/* Scene 2: Bitfield Magic */}
        <Series.Sequence durationInFrames={audioManifest.scenes[1].durationInFrames + 3}>
          <Scene2Bitfield />
        </Series.Sequence>

        {/* Scene 3: Enum State Machine */}
        <Series.Sequence durationInFrames={audioManifest.scenes[2].durationInFrames + 3}>
          <Scene3Enum />
        </Series.Sequence>

        {/* Scene 4: Union Wrapping */}
        <Series.Sequence durationInFrames={audioManifest.scenes[3].durationInFrames + 3}>
          <Scene4Union />
        </Series.Sequence>

        {/* Scene 5: Industrial Standard */}
        <Series.Sequence durationInFrames={audioManifest.scenes[4].durationInFrames + 3}>
          <Scene5Impact />
        </Series.Sequence>

        {/* Scene 6: Outro */}
        <Series.Sequence durationInFrames={audioManifest.scenes[5].durationInFrames + 10}>
          <Scene6Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
