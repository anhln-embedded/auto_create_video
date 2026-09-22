import React from "react";
import { Scene1HookTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene1Hook: React.FC = () => {
  return (
    <Scene1HookTemplate
      audioPath={audioManifest.scenes[0].audioPath}
      subtitleText={audioManifest.scenes[0].text}
      durationInFrames={audioManifest.scenes[0].durationInFrames}
      episodeTag="TẬP 7.5: C/C++ NÂNG CAO"
      title="BỘ BA NGUYÊN TỬ ÁNH XẠ THANH GHI"
      question="Vừa xóa cả 32-bit, vừa bật tắt từng bit riêng lẻ như thế nào?"
      categoryBadge="FIRMWARE ARCH"
      points={[
        {
          icon: "🎛️",
          title: "STRUCT BITFIELD + ENUM",
          desc: "Định nghĩa cờ hiệu chiếm đúng 1 bit, máy trạng thái FSM 2 bit cực kỳ trực quan!",
        },
        {
          icon: "🛡️",
          title: "UNION WRAPPER: REG.VAL & REG.BITS",
          desc: "Bọc vào Union: Ghi 32-bit một lệnh, chỉnh bit an toàn không cần phép dịch bit!",
          isHighlight: true,
        },
      ]}
    />
  );
};
