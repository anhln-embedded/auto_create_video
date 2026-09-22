import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { SampleEmbeddedVideo } from "./examples/SampleEmbeddedVideo/SampleEmbeddedVideo";
import { sampleEmbeddedVideoSchema } from "./examples/SampleEmbeddedVideo/types";
import { audioManifest as sampleAudioManifest } from "./examples/SampleEmbeddedVideo/audioData";

export const RemotionRoot: React.FC = () => {
  const sampleDurationInFrames =
    sampleAudioManifest.scenes[0].durationInFrames + 3 +
    sampleAudioManifest.scenes[1].durationInFrames + 3 +
    sampleAudioManifest.scenes[2].durationInFrames + 3 +
    sampleAudioManifest.scenes[3].durationInFrames + 3 +
    sampleAudioManifest.scenes[4].durationInFrames + 3 +
    sampleAudioManifest.scenes[5].durationInFrames + 10;

  return (
    <>
      {/* 60s TikTok Flagship: Sample Embedded Explainer Video (Struct Bitfield + Union + Enum) */}
      <Composition
        id="SampleEmbeddedVideo"
        component={SampleEmbeddedVideo}
        durationInFrames={sampleDurationInFrames}
        fps={30}
        width={1080}
        height={1920}
        schema={sampleEmbeddedVideoSchema}
        defaultProps={{
          title: "Đỉnh Cao Firmware: Struct Bitfield + Union + Enum Ánh Xạ Thanh Ghi",
          episode: "TẬP 7.5: C/C++ NÂNG CAO",
          channelName: "Ngoc Einstein",
          websiteTag: "EMBEDDED-AIOT.COM",
        }}
      />
    </>
  );
};
