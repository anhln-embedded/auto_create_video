import React from "react";
import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox, WebsiteOutroCard } from "../components";

export interface Scene6OutroProps {
  audioPath: string;
  subtitleText: string;
  durationInFrames: number;
  nextEpisodeTitle?: string;
  nextEpisodeTag?: string;
  courseTitle?: string;
  courseSubtitle?: string;
  websiteUrl?: string;
  callToAction?: string;
}

export const Scene6OutroTemplate: React.FC<Scene6OutroProps> = ({
  audioPath,
  subtitleText,
  durationInFrames,
  nextEpisodeTitle,
  nextEpisodeTag = "TẬP TIẾP THEO ➔",
  courseTitle = "KHÓA HỌC LẬP TRÌNH C NHÚNG & AIOT THỰC CHIẾN",
  courseSubtitle = "Tối ưu từng chu kỳ CPU và làm chủ kiến trúc Firmware chuẩn hãng cùng Ngoc Einstein",
  websiteUrl = "https://embedded-aiot.com",
  callToAction = "THẢ TIM & THEO DÕI ĐỂ KHÔNG BỎ LỠ BÀI HỌC TIẾP THEO!",
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
        className="w-full max-w-[1020px] flex flex-col gap-5 mt-3 items-center"
      >
        {/* Next Episode Teaser Banner (Open Loop) */}
        {nextEpisodeTitle && (
          <div className="w-full rounded-2xl border-2 border-orange-500/50 bg-gradient-to-r from-orange-950/80 via-slate-900/90 to-orange-950/80 p-5 backdrop-blur-xl flex items-center justify-between shadow-[0_0_30px_rgba(240,90,40,0.25)]">
            <div className="flex items-center gap-4">
              <span className="text-4xl animate-pulse">👑</span>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase text-orange-400 tracking-wider">ĐÓN XEM TIẾP THEO</span>
                <span className="font-heading text-lg md:text-xl font-black text-white">
                  {nextEpisodeTitle}
                </span>
              </div>
            </div>
            <span className="rounded-xl bg-orange-500/20 px-4 py-2 font-mono text-sm font-bold text-orange-300">
              {nextEpisodeTag}
            </span>
          </div>
        )}

        {/* Website Outro Card */}
        <WebsiteOutroCard
          title={courseTitle}
          subtitle={courseSubtitle}
          websiteUrl={websiteUrl}
          callToAction={callToAction}
        />
      </div>

      <SubtitleBox text={subtitleText} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
