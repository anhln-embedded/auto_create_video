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

export const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, from: -60, to: 0, config: { damping: 12 } });
  const heroSpring = spring({ frame: frame - 4, fps, from: 0.88, to: 1, config: { damping: 12 } });
  const badgeSpring = spring({ frame: frame - 12, fps, from: 50, to: 0, config: { damping: 13 } });

  const pulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.98, 1.02]
  );

  return (
    <AbsoluteFill className="bg-[#07080a] text-white overflow-hidden select-none font-sans">
      <Audio src={staticFile(audioManifest.scenes[7].audioPath)} />

      {/* LAYER 1: Full-Bleed Ambient Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.25), transparent 65%),
                         radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.2), transparent 70%),
                         linear-gradient(to bottom, rgba(7,8,10,0.92) 0%, rgba(7,8,10,0.5) 45%, rgba(7,8,10,0.88) 100%)`,
          }}
        />
      </div>

      {/* Top Safe Area: Brand Header */}
      <BrandHeader channelName="Ngoc Einstein" websiteTag="EMBEDDED-AIOT.COM" top="45px" />

      {/* Episode / Category Title Badge */}
      <div
        style={{ transform: `translateY(${titleSpring}px)` }}
        className="absolute top-[120px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3.5 rounded-full border-2 border-amber-400/80 bg-slate-950/95 px-8 py-3.5 shadow-[0_0_35px_rgba(245,158,11,0.5)] backdrop-blur-xl"
      >
        <span className="text-3xl">🏆</span>
        <span className="font-heading text-2xl font-black tracking-wider text-amber-300 uppercase">
          TỔNG KẾT • HÔN NHÂN TOÁN HỌC & CHIP BÁN DẪN
        </span>
      </div>

      {/* LAYER 2: Hero Visual Centerpiece (y: 215px to 1015px) */}
      <div
        style={{ transform: `scale(${heroSpring})` }}
        className="absolute top-[215px] left-1/2 -translate-x-1/2 w-[960px] h-[800px] z-10 flex flex-col justify-between gap-5"
      >
        {/* Top: 70-Year Grand Evolution Timeline (Height ~430px) */}
        <div className="rounded-3xl border-3 border-amber-400/80 bg-slate-950/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.3)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <span className="text-2xl font-black text-white uppercase tracking-wide">
              📜 DÒNG THỜI GIAN 70 NĂM LỊCH SỬ AI
            </span>
            <span className="text-sm font-mono text-amber-300 bg-amber-950/90 px-3.5 py-1 rounded-xl border border-amber-500/40 font-bold">
              1950 ➔ 2026
            </span>
          </div>

          {/* Timeline Milestones */}
          <div className="grid grid-cols-5 gap-3 my-3">
            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border-2 border-blue-500/50">
              <div className="text-sm font-mono text-blue-300 font-bold">1950</div>
              <div className="text-lg font-black text-white mt-1">Turing</div>
              <div className="text-xs text-slate-300 mt-1">Tư duy máy</div>
            </div>

            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border-2 border-rose-500/50">
              <div className="text-sm font-mono text-rose-300 font-bold">1969</div>
              <div className="text-lg font-black text-white mt-1">Minsky</div>
              <div className="text-xs text-rose-300 mt-1">Bẫy XOR</div>
            </div>

            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border-2 border-emerald-500/50">
              <div className="text-sm font-mono text-emerald-300 font-bold">1986</div>
              <div className="text-lg font-black text-white mt-1">Hinton</div>
              <div className="text-xs text-slate-300 mt-1">Backprop</div>
            </div>

            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border-2 border-purple-500/50">
              <div className="text-sm font-mono text-purple-300 font-bold">2012</div>
              <div className="text-lg font-black text-white mt-1">NVIDIA GPU</div>
              <div className="text-xs text-purple-300 mt-1">AlexNet</div>
            </div>

            <div className="rounded-2xl bg-slate-900/90 p-3 text-center border-2 border-cyan-500/50">
              <div className="text-sm font-mono text-cyan-300 font-bold">2026</div>
              <div className="text-lg font-black text-white mt-1">Edge AI</div>
              <div className="text-xs text-cyan-300 mt-1">TinyML Chip</div>
            </div>
          </div>

          <div
            style={{ transform: `scale(${pulse})` }}
            className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-500/20 border-2 border-amber-400 p-3.5 text-center shadow-lg"
          >
            <p className="text-2xl font-black text-amber-300 tracking-wide">
              💡 AI = THUẬT TOÁN TOÁN HỌC + CHIP BÁN DẪN!
            </p>
          </div>
        </div>

        {/* Bottom: Call to Action Brand Card (Height ~340px) */}
        <div className="rounded-3xl border-3 border-cyan-400/80 bg-slate-950/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <span className="text-2xl font-black text-white uppercase">
              🚀 TRỞ THÀNH NGƯỜI LÀM CHỦ CÔNG NGHỆ
            </span>
            <span className="text-sm font-mono text-cyan-300 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-500/40 font-bold">
              KỸ SƯ HỆ THỐNG
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2">
            <div className="rounded-xl border border-cyan-500/40 bg-slate-900/90 p-3 text-center">
              <div className="text-xs font-mono text-cyan-300">BƯỚC 1</div>
              <div className="text-lg font-black text-white mt-0.5">Lập Trình C</div>
            </div>
            <div className="rounded-xl border border-emerald-500/40 bg-slate-900/90 p-3 text-center">
              <div className="text-xs font-mono text-emerald-300">BƯỚC 2</div>
              <div className="text-lg font-black text-white mt-0.5">Hệ Thống Nhúng</div>
            </div>
            <div className="rounded-xl border border-purple-500/40 bg-slate-900/90 p-3 text-center">
              <div className="text-xs font-mono text-purple-300">BƯỚC 3</div>
              <div className="text-lg font-black text-white mt-0.5">Edge AI & TinyML</div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 px-4 text-center font-black text-xl text-white shadow-xl">
              🌐 EMBEDDED-AIOT.COM
            </div>
            <div className="flex-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 px-4 text-center font-black text-xl text-white shadow-xl">
              🔥 KÊNH NGOC EINSTEIN
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Dynamic Keyword Badges (y: 1040px to 1210px) */}
      <div
        style={{ transform: `translateY(${badgeSpring}px)` }}
        className="absolute top-[1040px] left-1/2 -translate-x-1/2 w-[960px] z-20 grid grid-cols-2 gap-5"
      >
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(245,158,11,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">⚡</span>
          <div>
            <div className="text-sm font-mono text-amber-300 font-bold uppercase">LÀM CHỦ CÔNG NGHỆ</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              Đừng chỉ là người dùng, hãy là người sáng tạo!
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-cyan-400 bg-cyan-950/85 p-6 flex items-center gap-4 shadow-[0_15px_35px_rgba(6,182,212,0.35)] backdrop-blur-xl">
          <span className="text-5xl flex-shrink-0">📚</span>
          <div>
            <div className="text-sm font-mono text-cyan-300 font-bold uppercase">NỀN TẢNG VỮNG CHẮC</div>
            <div className="text-2xl font-black text-white leading-snug mt-0.5">
              C, Vi điều khiển & Kiến trúc máy tính!
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: Kinetic Karaoke Subtitles (bottom=380px, avoiding TikTok UI danger zone) */}
      <SubtitleBox
        text={audioManifest.scenes[7].text}
        bottom="380px"
        fontSize="text-5xl font-black"
        highlightColor="text-amber-400"
      />

      {/* Bottom Ambient Glow */}
      <div className="absolute bottom-0 inset-x-0 h-[360px] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-0" />
    </AbsoluteFill>
  );
};
