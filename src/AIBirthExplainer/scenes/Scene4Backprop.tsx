import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrandHeader, SubtitleBox } from "../../components/embedded";
import { audioManifest } from "../audioData";

export const Scene4Backprop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSlide = spring({
    frame,
    fps,
    from: -30,
    to: 0,
    config: { damping: 14 },
  });

  const cardOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-start pt-48 px-6 text-white bg-[#07080a]">
      <Audio src={staticFile(audioManifest.scenes[3].audioPath)} />
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="130px" />

      {/* Episode Tag */}
      <div
        style={{ transform: `translateY(${titleSlide}px)` }}
        className="mt-2 flex items-center gap-3.5 rounded-2xl border-2 border-emerald-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_35px_rgba(16,185,129,0.4)]"
      >
        <span className="text-3xl">✨</span>
        <span className="font-heading text-xl md:text-2xl font-black tracking-wider text-emerald-300 uppercase">
          1986: LAN TRUYỀN NGƯỢC (BACKPROPAGATION)
        </span>
      </div>

      {/* Main Card */}
      <div
        style={{ opacity: cardOpacity }}
        className="mt-6 w-full max-w-[1020px] rounded-3xl border-2 border-emerald-500/40 bg-slate-950/95 p-8 backdrop-blur-2xl shadow-2xl flex flex-col gap-6"
      >
        {/* Breakthrough: Multi-Layer Neural Network */}
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/20 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-bold text-emerald-400 uppercase">
              BƯỚC ĐỘT PHÁ CỦA GEOFFREY HINTON
            </span>
            <span className="text-xs font-mono bg-emerald-900/60 text-emerald-200 px-3 py-1 rounded">
              1986
            </span>
          </div>
          <div className="text-xl font-bold text-white">
            Mạng Nơ-ron Đa Tầng (Multi-layer Perceptron): Giải quyết hoàn toàn bài toán XOR!
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="rounded-xl border border-blue-500/40 bg-blue-950/50 px-4 py-2 text-center">
              <div className="text-xs text-blue-300">TẦNG ĐẦU VÀO</div>
              <div className="text-sm font-bold text-white">Input Layer</div>
            </div>
            <span className="text-emerald-400 font-bold">➔</span>
            <div className="rounded-xl border border-purple-500/40 bg-purple-950/50 px-4 py-2 text-center">
              <div className="text-xs text-purple-300">TẦNG ẨN</div>
              <div className="text-sm font-bold text-white">Hidden Layers</div>
            </div>
            <span className="text-emerald-400 font-bold">➔</span>
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/50 px-4 py-2 text-center">
              <div className="text-xs text-emerald-300">KẾT QUẢ</div>
              <div className="text-sm font-bold text-white">Output Layer</div>
            </div>
          </div>
        </div>

        {/* Mechanism: Backpropagation */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎯</span>
            <div>
              <div className="text-base font-bold text-amber-300">
                THUẬT TOÁN LAN TRUYỀN NGƯỢC (BACKPROP)
              </div>
              <div className="text-sm text-slate-300">
                Tính toán đạo hàm sai số để tự động điều chỉnh từng trọng số (Weights)
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded border border-amber-500/30">
            TỰ HỌC TỰ SỬA
          </span>
        </div>

        {/* The Bottleneck: Slow CPU */}
        <div className="rounded-2xl border-2 border-rose-500/40 bg-rose-950/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐢</span>
            <div>
              <div className="text-sm font-bold text-rose-300">NÚT THẮT PHẦN CỨNG: CPU QUÁ RÙA BÒ!</div>
              <div className="text-xs text-slate-300">
                Để huấn luyện một mô hình nhỏ, CPU thời đó mất ròng rã cả tháng trời ➔ Mùa đông lần 2!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-950 px-3 py-1 rounded">
            THIẾU CHIP MẠNH
          </span>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[3].text}
        durationInFrames={audioManifest.scenes[3].durationInFrames}
        bottom="140px"
      />
    </AbsoluteFill>
  );
};
