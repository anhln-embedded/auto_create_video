export const audioManifest = {
  "topic": "SampleEmbeddedVideo",
  "engine": "ZeroTTS",
  "voice": "quangminh",
  "totalScenes": 6,
  "totalDurationFrames": 1820,
  "totalDurationSec": 60.7,
  "scenes": [
    {
      "id": "scene1_hook",
      "text": "Làm thế nào để vừa xóa sạch toàn bộ thanh ghi 32-bit bằng một lệnh, lại vừa có thể bật tắt từng bit cờ hiệu riêng lẻ mà không cần dùng phép dịch bit? Bí mật nằm ở bộ ba nguyên tử: Bitfield, Union và Enum!",
      "audioPath": "audio/SampleEmbeddedVideo/scene1_hook.mp3",
      "durationInFrames": 324
    },
    {
      "id": "scene2_bitfield_magic",
      "text": "Bitfield trong C cho phép bạn định nghĩa các biến chỉ chiếm đúng 1 bit, 2 bit hoặc 4 bit. Ví dụ: cờ ENABLE chiếm 1 bit, cờ NGẮT chiếm 1 bit, các bit còn lại dành cho chế độ hoạt động.",
      "audioPath": "audio/SampleEmbeddedVideo/scene2_bitfield_magic.mp3",
      "durationInFrames": 292
    },
    {
      "id": "scene3_enum_state_machine",
      "text": "Kết hợp với Enum máy trạng thái FSM: Bạn định nghĩa các chế độ như IDLE, TX, RX, SLEEP tương ứng với giá trị nhị phân từ 0 đến 3 để gán thẳng vào các bit chế độ của thanh ghi!",
      "audioPath": "audio/SampleEmbeddedVideo/scene3_enum_state_machine.mp3",
      "durationInFrames": 304
    },
    {
      "id": "scene4_union_wrapping",
      "text": "Sau đó, bọc toàn bộ Struct Bitfield này vào cùng một Union với biến uint32_t val! Nhờ đó, bạn có thể ghi toàn bộ thanh ghi bằng REG.val = 0, hoặc cấu hình từng bit bằng REG.bits.enable = 1!",
      "audioPath": "audio/SampleEmbeddedVideo/scene4_union_wrapping.mp3",
      "durationInFrames": 350
    },
    {
      "id": "scene5_industrial_standard",
      "text": "Đây chính là kiến trúc chuẩn mực được các hãng chip hàng đầu như STMicroelectronics và Espressif sử dụng trong toàn bộ thư viện HAL và ESP-IDF!",
      "audioPath": "audio/SampleEmbeddedVideo/scene5_industrial_standard.mp3",
      "durationInFrames": 267
    },
    {
      "id": "scene6_outro",
      "text": "Chúc mừng bạn đã hoàn thành trọn bộ Series 7! Hãy like, chia sẻ video và truy cập embedded-aiot.com để nhận mã nguồn thực hành và tham gia khóa học cùng Ngoc Einstein nhé!",
      "audioPath": "audio/SampleEmbeddedVideo/scene6_outro.mp3",
      "durationInFrames": 283
    }
  ]
} as const;
