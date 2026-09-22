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

export const Scene2AlanTuring: React.FC = () => {
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

  const imgZoom = interpolate(frame, [0, audioManifest.scenes[1].durationInFrames], [1.0, 1.08]);

  return (
    <AbsoluteFill className="text-white bg-[#07080a] overflow-hidden">
      <Audio src={staticFile(audioManifest.scenes[1].audioPath)} />

      {/* Top Header & Episode Tag */}
      <div className="absolute top-10 inset-x-0 flex flex-col items-center z-20">
        <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="0px" />
        <div
          style={{ transform: `translateY(${titleSlide}px)` }}
          className="mt-20 flex items-center gap-4 rounded-2xl border-2 border-blue-500/60 bg-slate-900/95 px-8 py-3.5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.4)]"
        >
          <span className="text-4xl">📜</span>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-wider text-blue-300 uppercase">
            1950 - 1956: CÂU HỎI LỊCH SỬ CỦA ALAN TURING
          </span>
        </div>
      </div>

      {/* Main Full-Height Content Area: y=230px to y=1690px */}
      <div
        style={{ opacity: cardOpacity }}
        className="absolute top-[230px] bottom-[225px] inset-x-7 flex flex-col justify-between z-10"
      >
        {/* Card 1: Alan Turing Hero Portrait & The Question (Height ~590px) */}
        <div className="rounded-3xl border-2 border-blue-500/60 bg-slate-950/90 p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="flex items-center gap-7">
            {/* Big Portrait of Alan Turing */}
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.35)] flex-shrink-0">
              <Img
                src={staticFile("images/ai_birth/alan_turing.jpg")}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${imgZoom})` }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/95 py-2 text-center font-mono text-base font-bold text-amber-300">
                ALAN TURING (1912 - 1954)
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3.5 flex-1">
              <div className="inline-flex items-center gap-2 self-start rounded-xl bg-amber-950/90 px-4 py-2 border border-amber-500/40">
                <span className="text-base font-mono font-black text-amber-300 uppercase tracking-wider">
                  BÀI BÁO HUYỀN THOẠI 1950
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white italic leading-snug">
                “Liệu cỗ máy có biết suy nghĩ?”
              </h3>
              <p className="text-2xl text-slate-200 leading-relaxed font-medium">
                Thiên tài toán học đề xuất phép thử <span className="text-amber-300 font-bold">Turing Test</span>: Đặt nền móng lý thuyết đầu tiên cho toàn bộ ngành trí tuệ nhân tạo.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-500/30 flex items-center justify-between">
            <span className="text-xl font-bold text-blue-300">
              ✨ Khởi nguồn cho mọi mô hình AI hiện đại
            </span>
            <span className="text-base font-mono text-slate-300 bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-700 font-semibold">
              TURING TEST
            </span>
          </div>
        </div>

        {/* Card 2: Real Historical Supercomputer ENIAC (Height ~470px) */}
        <div className="rounded-3xl border-2 border-slate-700 bg-slate-950/90 p-7 backdrop-blur-2xl shadow-2xl flex flex-col justify-between gap-4">
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-600 shadow-xl">
            <Img
              src={staticFile("images/ai_birth/eniac_computer.jpg")}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-base font-mono font-bold text-cyan-300 bg-slate-950/90 px-3.5 py-1.5 rounded-xl border border-cyan-500/40">
                SIÊU MÁY TÍNH ENIAC (1946)
              </span>
              <span className="text-sm font-mono text-slate-300 bg-slate-900/90 px-3 py-1 rounded-lg">
                18,000 BÓNG CHÂN KHÔNG
              </span>
            </div>
          </div>

          <p className="text-2xl text-slate-100 leading-relaxed font-medium">
            Máy tính thời đó <span className="text-cyan-300 font-bold">nặng 30 tấn, to bằng cả căn phòng</span>, hoạt động bằng hàng ngàn bóng đèn chân không tiêu thụ hàng trăm kilowatt điện!
          </p>
        </div>

        {/* Card 3: Dartmouth Workshop 1956 (Height ~280px) */}
        <div className="rounded-3xl border-2 border-blue-500/60 bg-blue-950/40 p-7 backdrop-blur-2xl shadow-[0_0_35px_rgba(59,130,246,0.25)] flex items-center gap-7">
          <div className="text-7xl flex-shrink-0">🏛️</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl md:text-3xl font-black text-blue-200 uppercase">
                HỘI NGHỊ DARTMOUTH 1956
              </div>
              <span className="text-sm font-mono text-emerald-300 bg-emerald-950 px-4 py-1.5 rounded-xl border border-emerald-500/40 font-bold">
                KHAI SINH CỤM TỪ "AI"
              </span>
            </div>
            <p className="text-2xl text-slate-200 mt-2.5 leading-relaxed font-medium">
              Các giáo sư hàng đầu tự tin tuyên bố: <span className="text-amber-300 italic font-bold">"Chỉ 20 năm nữa, máy tính sẽ thay thế trí óc con người!"</span> ➔ Đỉnh cao kỳ vọng hoang tưởng!
            </p>
          </div>
        </div>
      </div>

      <SubtitleBox
        text={audioManifest.scenes[1].text}
        durationInFrames={audioManifest.scenes[1].durationInFrames}
        bottom="80px"
      />
    </AbsoluteFill>
  );
};
