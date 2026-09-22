import React from "react";

export interface CodeBlockCardProps {
  filename?: string;
  badge?: string;
  code?: string;
  children?: React.ReactNode;
  fontSize?: string; // default "text-[23px]"
  lineHeight?: string; // default "leading-[1.65]"
  takeaway?: string;
  takeawayBadge?: string;
  borderColor?: string; // default "border-slate-800"
}

export const CodeBlockCard: React.FC<CodeBlockCardProps> = ({
  filename = "main.c",
  badge = "C/C++ FIRMWARE",
  code,
  children,
  fontSize = "text-[23px]",
  lineHeight = "leading-[1.65]",
  takeaway,
  takeawayBadge,
  borderColor = "border-slate-800",
}) => {
  return (
    <div className={`w-full rounded-3xl border-2 ${borderColor} bg-slate-950/95 p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl`}>
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
          <span className="font-mono text-sm font-bold text-slate-400 ml-2">{filename}</span>
        </div>
        <span className="font-mono text-xs font-black text-amber-400 uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-lg">
          {badge}
        </span>
      </div>

      {/* Code Area - Large Crisp Typography */}
      <pre className={`font-mono ${fontSize} ${lineHeight} text-slate-100 bg-slate-900/95 p-6 rounded-2xl border-2 border-slate-800 shadow-inner overflow-hidden whitespace-pre`}>
        {children || code}
      </pre>

      {/* Bottom Takeaway Bar */}
      {takeaway && (
        <div className="rounded-2xl bg-indigo-950/50 border-2 border-indigo-500/40 p-4 text-base font-semibold text-indigo-200 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <span className="text-white font-medium">{takeaway}</span>
          </div>
          {takeawayBadge && (
            <span className="rounded-xl bg-indigo-500/30 border border-indigo-400/40 px-3 py-1 font-mono text-xs font-black text-indigo-300 whitespace-nowrap">
              {takeawayBadge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
