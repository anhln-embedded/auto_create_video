import React from "react";
import { Scene4CodeTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene3Enum: React.FC = () => {
  return (
    <Scene4CodeTemplate
      audioPath={audioManifest.scenes[2].audioPath}
      subtitleText={audioManifest.scenes[2].text}
      durationInFrames={audioManifest.scenes[2].durationInFrames}
      sectionTitle="KẾT HỢP ENUM MÁY TRẠNG THÁI (FSM)"
      sectionBadge="FSM MODES"
      sectionIcon="🚥"
      filename="fsm_modes.h"
      badge="2-BIT STATE ENCODING"
      codeContent={
        <>
          <span className="text-pink-400 font-bold">typedef enum</span> {'{\n'}
          {"    "}<span className="text-cyan-300 font-bold">MODE_IDLE</span>  = <span className="text-amber-400 font-black">0b00</span>, <span className="text-slate-400">// Chế độ Chờ</span>{"\n"}
          {"    "}<span className="text-cyan-300 font-bold">MODE_TX</span>    = <span className="text-amber-400 font-black">0b01</span>, <span className="text-emerald-400 font-bold">// Phát dữ liệu</span>{"\n"}
          {"    "}<span className="text-cyan-300 font-bold">MODE_RX</span>    = <span className="text-amber-400 font-black">0b10</span>, <span className="text-emerald-400 font-bold">// Nhận dữ liệu</span>{"\n"}
          {"    "}<span className="text-cyan-300 font-bold">MODE_SLEEP</span> = <span className="text-amber-400 font-black">0b11</span>  <span className="text-rose-400 font-bold">// Tiết kiệm điện</span>{"\n"}
          {'}'} DeviceMode_t;
        </>
      }
      takeaway="4 giá trị nhị phân (00, 01, 10, 11) vừa khít với 2 bit trường mode : 2!"
      takeawayBadge="PERFECT MATCH"
    />
  );
};
