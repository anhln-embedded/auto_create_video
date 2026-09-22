import React from "react";
import { Scene5ImpactTemplate } from "../../../templates";
import { audioManifest } from "../audioData";

export const Scene5Impact: React.FC = () => {
  return (
    <Scene5ImpactTemplate
      audioPath={audioManifest.scenes[4].audioPath}
      subtitleText={audioManifest.scenes[4].text}
      durationInFrames={audioManifest.scenes[4].durationInFrames}
      title="CHUẨN MỰC THƯ VIỆN HAL & ESP-IDF"
      badge="INDUSTRY GRADE"
      icon="🏛️"
      cards={[
        {
          icon: "⚡",
          title: "STMicroelectronics (STM32 HAL / LL)",
          desc: "Toàn bộ thanh ghi GPIO, UART, SPI, DMA đều áp dụng mẫu Bitfield + Union để lập trình viên thao tác cờ an toàn!",
          tag: "STM32 HAL / LL",
        },
        {
          icon: "📶",
          title: "Espressif (ESP32 ESP-IDF)",
          desc: "Driver phần cứng ngoại vi WiFi, Bluetooth, Timer đều dùng Union bọc Bitfield để ghi toàn bộ thanh ghi trong đúng 1 lệnh CPU!",
          tag: "ESP32 ESP-IDF",
          isHighlight: true,
        },
      ]}
      footerTip="Nắm vững mẫu thiết kế này, bạn đã làm chủ kiến trúc Firmware đẳng cấp của các tập đoàn bán dẫn hàng đầu thế giới!"
    />
  );
};
