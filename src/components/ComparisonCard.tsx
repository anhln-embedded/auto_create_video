import React from "react";

export interface ComparisonBlock {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  isHighlight?: boolean;
}

export interface ComparisonCardProps {
  title: string;
  icon?: string;
  badge?: string;
  blocks: ComparisonBlock[];
  borderColor?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  icon = "⚖️",
  badge = "COMPARISON",
  blocks,
  borderColor = "border-indigo-500/50",
}) => {
  return (
    <div className={`w-full rounded-3xl border-2 ${borderColor} bg-slate-950/95 p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <span className="font-heading text-2xl font-black text-white">{title}</span>
        </div>
        <span className="rounded-xl bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 font-mono text-xs font-black text-indigo-300 uppercase">
          {badge}
        </span>
      </div>

      {/* Vertical Stacking Blocks (Rule: Never split horizontally) */}
      <div className="flex flex-col gap-3.5">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border-2 p-5 flex items-start gap-4 transition-all ${
              block.isHighlight
                ? "border-emerald-500/50 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                : "border-slate-800 bg-slate-900/80"
            }`}
          >
            <span className="text-4xl flex-shrink-0">{block.icon}</span>
            <div className="flex flex-col gap-1 flex-grow">
              <div className="flex items-center justify-between">
                <span className={`text-xl font-black ${block.isHighlight ? "text-emerald-300" : "text-white"}`}>
                  {block.title}
                </span>
                {block.badge && (
                  <span className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                    block.isHighlight ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                  }`}>
                    {block.badge}
                  </span>
                )}
              </div>
              <p className="text-base font-medium text-slate-300 leading-relaxed">
                {block.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
