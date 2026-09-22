import React from "react";
import { Scene4CodeTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene4Union: React.FC = () => {
  return (
    <Scene4CodeTemplate
      audioPath={audioManifest.scenes[3].audioPath}
      subtitleText={audioManifest.scenes[3].text}
      durationInFrames={audioManifest.scenes[3].durationInFrames}
      sectionTitle="BỌC STRUCT VÀO UNION: VŨ KHÍ 2 TRONG 1"
      sectionBadge="REG.VAL & REG.BITS"
      sectionIcon="🛡️"
      filename="register_mapping.c"
      badge="HARDWARE REG TYPE"
      codeContent={
        <>
          <span className="text-pink-400 font-bold">typedef union</span> {'{\n'}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> val;  <span className="text-slate-400">// Ghi nhanh toàn bộ 32-bit</span>{"\n"}
          {"    "}<span className="text-pink-400 font-bold">struct</span> {'{\n'}
          {"        "}<span className="text-pink-400 font-bold">uint32_t</span> enable    : <span className="text-amber-400 font-black">1</span>;{"\n"}
          {"        "}<span className="text-pink-400 font-bold">uint32_t</span> interrupt : <span className="text-amber-400 font-black">1</span>;{"\n"}
          {"        "}<span className="text-pink-400 font-bold">uint32_t</span> mode      : <span className="text-amber-400 font-black">2</span>;{"\n"}
          {"    "}Bits_t bits;{"\n"}
          {'}'} ControlReg_t;{"\n\n"}
          ControlReg_t CR;{"\n"}
          CR.val = <span className="text-amber-400 font-black">0</span>;             <span className="text-slate-400">// 1 lệnh xóa sạch 32-bit!</span>{"\n"}
          CR.bits.enable = <span className="text-amber-400 font-black">1</span>;      <span className="text-emerald-400 font-bold">// Bật cờ (không cần |=)</span>{"\n"}
          CR.bits.mode = MODE_TX;  <span className="text-cyan-300 font-bold">// Gán FSM trực quan!</span>
        </>
      }
      takeaway="CR.val = 0 xóa 32-bit trong 1 chu kỳ • CR.bits.enable = 1 chỉnh cờ an toàn"
      takeawayBadge="ZERO OVERHEAD"
    />
  );
};
