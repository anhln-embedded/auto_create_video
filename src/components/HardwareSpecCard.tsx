import React from "react";

export interface SpecItem {
  label: string;
  value: string;
  color?: string; // e.g. "text-cyan-300", "text-amber-400"
}

export interface HardwareSpecCardProps {
  title: string;
  icon?: string;
  badge?: string;
  specs: SpecItem[];
  borderColor?: string;
  glowColor?: string;
}

export const HardwareSpecCard: React.FC<HardwareSpecCardProps> = ({
  title,
  icon = "⚡",
  badge = "HARDWARE SPECS",
  specs,
  borderColor = "border-cyan-500/50",
  glowColor = "rgba(6,182,212,0.2)",
}) => {
  return (
    <div
      style={{ boxShadow: `0 0 35px ${glowColor}` }}
      className={`w-full rounded-3xl border-2 ${borderColor} bg-slate-950/95 p-6 flex flex-col gap-4 backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <span className="font-heading text-2xl font-black text-white">{title}</span>
        </div>
        <span className="rounded-xl bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 font-mono text-xs font-black text-cyan-300 uppercase">
          {badge}
        </span>
      </div>

      {/* Spec Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {specs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col gap-1"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
            <span className={`font-mono text-2xl font-black ${item.color || "text-cyan-300"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
