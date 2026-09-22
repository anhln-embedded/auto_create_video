import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
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
    from: -40,
    to: 0,
    config: { damping: 14 },
  });

  const cardOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[3].durationInFrames], [1.0, 1.08]);

  return (
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[3].audioPath)} />

      {/* Top Header & Episode Tag: y: 40px to 220px */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-emerald-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.4)]"
        >
          <span className="text-4xl">✨</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-emerald-300 uppercase">
            1986: LAN TRUYỀN NGƯỢC (BACKPROPAGATION)
          </span>
        </div>
      </div>

      {/* Main Content Area: Exactly spans y=230px to y=1690px (Height = 1460px) */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Geoffrey Hinton Big Hero Card (Height ~590px) */}
        <div className="rounded-3xl border-2 border-emerald-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="flex items-center gap-7">
            {/* Big Portrait of Geoffrey Hinton */}
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex-shrink-0">
              <Img
                src={staticFile("images/ai_birth/geoffrey_hinton.jpg")}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${imgZoom})` }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-2 text-center font-mono text-base font-bold text-emerald-300">
                GEOFFREY HINTON
              </div>
            </div>

            {/* Content Beside Photo */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="inline-flex items-center gap-2 self-start rounded-xl bg-emerald-950/90 px-4 py-2 border border-emerald-500/50">
                <span className="text-base font-mono font-black text-emerald-300 uppercase tracking-wider">
                  ÔNG TỔ DEEP LEARNING • NOBEL 2024
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-snug">
                Khám Phá Mạng Nơ-ron Đa Tầng (MLP)
              </h3>
              <p className="text-2xl text-slate-200 leading-relaxed font-medium">
                Xếp chồng nhiều tầng nơ-ron: <span className="text-emerald-300 font-bold">Tầng Ẩn (Hidden Layers)</span> giải phóng sức mạnh phi tuyến tính, đánh sập bức tường XOR của Minsky!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/30 flex items-center justify-between">
            <span className="text-xl font-bold text-emerald-300">
              💡 Kỳ tích lịch sử chấm dứt 15 năm AI bị đóng băng
            </span>
            <span className="text-base font-mono text-slate-300 bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-700 font-semibold">
              1986 REVOLUTION
            </span>
          </div>
        </div>

        {/* Card 2: Backpropagation Mechanism (Height ~470px) */}
        <div className="rounded-3xl border-2 border-amber-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl">🎯</span>
              <span className="text-2xl md:text-3xl font-black text-amber-300 uppercase tracking-wide">
                THUẬT TOÁN LAN TRUYỀN NGƯỢC (BACKPROP)
              </span>
            </div>
            <span className="text-base font-mono text-amber-300 bg-amber-950 px-4 py-1.5 rounded-xl border border-amber-500/40 font-bold">
              TỰ HỌC TỰ SỬA
            </span>
          </div>

          <p className="text-2xl text-slate-100 leading-relaxed font-medium">
            Tính toán <span className="text-amber-300 font-bold">đạo hàm sai số (Gradients)</span> từ kết quả đầu ra ngược về từng nơ-ron để tự động điều chỉnh hàng triệu trọng số (Weights).
          </p>

          <div className="grid grid-cols-2 gap-5 mt-2">
            <div className="rounded-2xl bg-slate-900/95 border border-slate-700 p-5 text-center">
              <div className="text-lg font-mono text-slate-400 font-bold">CHIỀU TIẾN (FORWARD)</div>
              <div className="text-3xl font-black text-cyan-300 mt-1">Dự đoán kết quả ➔</div>
              <div className="text-base text-slate-400 mt-1">Tính sai số Loss</div>
            </div>
            <div className="rounded-2xl bg-amber-950/50 border border-amber-500/40 p-5 text-center">
              <div className="text-lg font-mono text-amber-300 font-bold">CHIỀU LÙI (BACKPROP)</div>
              <div className="text-3xl font-black text-amber-300 mt-1">← Tự sửa trọng số</div>
              <div className="text-base text-amber-300/80 mt-1">Hạ độ dốc Gradient</div>
            </div>
          </div>
        </div>

        {/* Card 3: CPU Bottleneck & Second Winter (Height ~300px) */}
        <div className="rounded-3xl border-2 border-rose-500/70 bg-rose-950/50 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(244,63,94,0.25)] flex items-center gap-7">
          <div className="text-7xl flex-shrink-0">🐢</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-black text-rose-200 uppercase">
                BI KỊCH PHẦN CỨNG: CPU THỜI ĐÓ QUÁ RÙA BÒ!
              </div>
              <span className="text-sm font-mono text-rose-300 bg-rose-950 px-4 py-1.5 rounded-xl border border-rose-500/40 font-bold">
                MÙA ĐÔNG LẦN 2
              </span>
            </div>
            <p className="text-2xl text-slate-200 mt-2.5 leading-relaxed font-medium">
              Mô hình toán học cực thông minh, nhưng CPU tuần tự mất ròng rã cả tháng để học 1 bức ảnh... vì <span className="text-rose-300 font-black">CHƯA CÓ GPU TÍNH TOÁN SONG SONG</span>!
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle Box: at bottom 80px */}
      <SubtitleBox
        text={audioManifest.scenes[3].text}
        durationInFrames={audioManifest.scenes[3].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
