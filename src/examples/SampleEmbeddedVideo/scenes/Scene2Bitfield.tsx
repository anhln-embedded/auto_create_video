import React from "react";
import { Scene4CodeTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene2Bitfield: React.FC = () => {
  return (
    <Scene4CodeTemplate
      audioPath={audioManifest.scenes[1].audioPath}
      subtitleText={audioManifest.scenes[1].text}
      durationInFrames={audioManifest.scenes[1].durationInFrames}
      sectionTitle="PHÉP THUẬT STRUCT BITFIELD TRONG C"
      sectionBadge="EXACT BIT SIZING"
      sectionIcon="🎛️"
      filename="register_struct.c"
      badge="32-BIT BITFIELD"
      codeContent={
        <>
          <span className="text-pink-400 font-bold">struct</span> {'{\n'}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> enable    : <span className="text-amber-400 font-black">1</span>;  <span className="text-emerald-400 font-bold">// 1 bit (0 hoặc 1)</span>{"\n"}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> interrupt : <span className="text-amber-400 font-black">1</span>;  <span className="text-emerald-400 font-bold">// 1 bit cờ ngắt</span>{"\n"}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> mode      : <span className="text-amber-400 font-black">2</span>;  <span className="text-cyan-300 font-bold">// 2 bit chế độ (0..3)</span>{"\n"}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> reserved  : <span className="text-amber-400 font-black">28</span>; <span className="text-slate-400">// 28 bit bảo lưu</span>{"\n"}
          {'}'} bits;
        </>
      }
      takeaway="Tổng: 1 + 1 + 2 + 28 = 32 bit = Đúng 4 Byte RAM"
      takeawayBadge="KHÔNG LÃNG PHÍ 1 BIT"
    />
  );
};
