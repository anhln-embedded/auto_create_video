# Mẫu Prompt Chuẩn: Chuyển Đổi Giáo Án Kỹ Thuật Thành Kịch Bản Video 6 Phân Cảnh

Khi bạn (AI Agent) nhận được một bài học, tài liệu kỹ thuật hoặc yêu cầu làm video, hãy sử dụng mẫu cấu trúc JSON sau để sinh kịch bản chuẩn cho `core/pipeline/create_video.ts`:

```json
[
  {
    "id": "scene1_hook",
    "text": "Câu hỏi giật gân hoặc một thảm họa kỹ thuật khiến người xem phải dừng ngón tay lại trong 3 giây đầu tiên."
  },
  {
    "id": "scene2_problem",
    "text": "Chỉ ra cạm bẫy thực tế hoặc thói quen code sai lầm mà nhiều lập trình viên mắc phải dẫn đến bug hoặc crash."
  },
  {
    "id": "scene3_concept",
    "text": "Bóc trần bản chất phần cứng: Giải thích cơ chế hoạt động bên trong ô nhớ RAM, xung nhịp CPU hoặc cấu trúc thanh ghi."
  },
  {
    "id": "scene4_code",
    "text": "Đoạn code C chuẩn Senior: Giải pháp tối ưu hóa, không tốn chu kỳ CPU thừa và an toàn tuyệt đối."
  },
  {
    "id": "scene5_impact",
    "text": "Minh chứng ứng dụng thực chiến trong thư viện chuẩn công nghiệp như STM32 HAL hoặc ESP32 ESP-IDF."
  },
  {
    "id": "scene6_outro",
    "text": "Vòng lặp mở giới thiệu tập tiếp theo, kêu gọi like follow kênh Ngoc Einstein và truy cập embedded-aiot.com."
  }
]
```

### Nguyên tắc độ dài câu:
- Mỗi câu thoại nên chứa từ **18 đến 30 từ** (tương đương 6 đến 12 giây đọc).
- Tổng thời lượng cả 6 cảnh nên dao động từ **55 đến 70 giây**.
- Không dùng từ ngữ sáo rỗng (*"Chào các bạn"*, *"Hôm nay mình sẽ chia sẻ"*). Đi thẳng vào vấn đề!
