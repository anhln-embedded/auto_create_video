import React from "react";
import { Scene6OutroTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene6Outro: React.FC = () => {
  return (
    <Scene6OutroTemplate
      audioPath={audioManifest.scenes[5].audioPath}
      subtitleText={audioManifest.scenes[5].text}
      durationInFrames={audioManifest.scenes[5].durationInFrames}
      nextEpisodeTitle="ĐÓN XEM CHỦ ĐỀ GOTO, SETJMP VÀ QUẢN LÝ BỘ NHỚ NHÚNG!"
      nextEpisodeTag="EPISODE NEXT ➔"
    />
  );
};
