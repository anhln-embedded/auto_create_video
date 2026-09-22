# 🚀 Auto_create_video: Hệ Thống Tự Động Hóa Sản Xuất Video Dọc (9:16) Với Remotion & AI Voiceover

Dự án đóng gói hoàn chỉnh giải pháp tự động tạo video ngắn (TikTok / YouTube Shorts / Facebook Reels) chuẩn Full HD 1080x1920 @ 30fps chuyên sâu về **Lập Trình Nhúng (Embedded Systems), C/C++ Firmware, Vi Điều Khiển (STM32, ESP32) và AIoT** cho kênh **Ngoc Einstein** và nền tảng **[embedded-aiot.com](https://embedded-aiot.com)**.

Dự án được thiết kế theo tiêu chuẩn **"Plug-and-Play for AI Agents"**: Bất kỳ AI Agent nào (Antigravity, Cursor, Claude Code, Copilot, v.v.) khi được cắm vào dự án này đều có thể tự động hiểu toàn bộ quy trình và sản xuất video từ A đến Z ngay lập tức.

---

## 🌟 1. Tính Năng Cốt Lõi

1. **AI Voiceover Kép (ZeroTTS CPU & EdgeTTS)**:
   - Tích hợp **ZeroTTS** (`zeroweight-ai/ZeroTTS`): Giọng đọc tiếng Việt chân thực (Quang Minh, Tiến Đạt) chạy offline 100% trên CPU, không cần GPU hay API key.
   - Dự phòng **EdgeTTS**: Tốc độ sinh audio tức thì, không tốn tài nguyên.
2. **Từ Điển Chuẩn Hóa Phát Âm Kỹ Thuật (`pronunciation_dict.json`)**:
   - Tự động thay thế thuật ngữ kỹ thuật tiếng Anh sang ngữ âm tự nhiên: `Big Endian` -> *Bích En-đi-ơn*, `Struct` -> *xờ-trắc*, `volatile` -> *vô-la-tai*, `Padding` -> *Pát-đinh*.
   - Bảo vệ tuyệt đối tên thương hiệu `Ngoc Einstein` (không bị đọc thành *Anh-xtanh*).
3. **Phụ Đề Karaoke Động (Zero-Layout-Shift Karaoke)**:
   - Component `SubtitleBox` tự động ngắt theo cụm 6 từ, highlight từ khóa theo nhịp đọc của giọng nói với độ trễ 0ms.
4. **Bộ UI Card Đồ Họa Cao Cấp Chuẩn 9:16**:
   - `BrandHeader`: Logo và nhận diện thương hiệu đặt tại vùng an toàn `top: 140px`.
   - `CodeBlockCard`: Khung hiển thị code C/C++ với **cỡ chữ lớn `text-[23px]` nét căng** trên điện thoại, giao diện editor MacOS 3 nút điều khiển.
   - `HardwareSpecCard`: Thẻ đối chiếu cấu hình chip, xung nhịp, RAM, Flash.
   - `ComparisonCard`: So sánh đối chiếu chuẩn theo chiều dọc (**Vertical Stacking**).
   - `WebsiteOutroCard`: Thẻ chuyển đổi traffic, kêu gọi thả tim và truy cập `embedded-aiot.com`.
5. **Kỹ Năng Đóng Gói Dành Cho AI Agent (`.agents/skills/video-creator/`)**:
   - Hướng dẫn chi tiết từng bước cho AI Agent trong file `SKILL.md` và `AGENTS.md`.

---

## 📁 2. Cấu Trúc Thư Mục Dự Án

```text
Auto_create_video/
├── .agents/
│   └── skills/
│       └── video-creator/
│           ├── SKILL.md                 # Master Guide cho mọi AI Agent
│           └── PROMPT_TEMPLATE.md       # Mẫu prompt sinh kịch bản từ giáo án
├── config/
│   ├── pronunciation_dict.json          # Từ điển phát âm thuật ngữ nhúng
│   └── voice_config.json                # Cấu hình giọng đọc & độ phân giải video
├── core/
│   ├── tts/
│   │   ├── normalizer.ts                # Bộ chuẩn hóa ngữ âm tiếng Anh
│   │   ├── synthesizer.ts               # Bộ điều phối giọng đọc thông minh
│   │   ├── edge_tts_runner.ts           # Runner EdgeTTS
│   │   └── zerotts_runner.py            # Runner ZeroTTS CPU
│   ├── pipeline/
│   │   ├── create_video.ts              # CLI tự động tạo video mới
│   │   └── render_video.ts              # CLI tự động render MP4
│   └── utils/
│       └── manifest_generator.ts        # Tính toán chính xác thời lượng frame
├── src/
│   ├── components/                      # Bộ linh kiện giao diện Remotion
│   │   ├── BrandHeader.tsx
│   │   ├── SubtitleBox.tsx
│   │   ├── CodeBlockCard.tsx
│   │   ├── HardwareSpecCard.tsx
│   │   ├── ComparisonCard.tsx
│   │   └── WebsiteOutroCard.tsx
│   ├── templates/                       # Mẫu 6 phân cảnh (Hook -> Problem -> Concept -> Code -> Impact -> Outro)
│   ├── examples/
│   │   └── SampleEmbeddedVideo/         # Video mẫu hoàn chỉnh chạy được ngay
│   ├── Root.tsx                         # Đăng ký Compositions
│   └── index.ts                         # Remotion entrypoint
├── public/
│   └── audio/                           # Thư mục lưu audio MP3 sinh ra
├── remotion.config.ts                   # Cấu hình Remotion, Chrome/Edge & Tailwind v4
├── tsconfig.json                        # Cấu hình TypeScript
└── package.json                         # Scripts & Dependencies
```

---

## ⚡ 3. Hướng Dẫn Sử Dụng Nhanh (Quickstart)

### Bước 1: Mở Remotion Studio để xem video mẫu
```bash
# Di chuyển vào thư mục dự án
cd Auto_create_video

# Khởi động giao diện xem trước Remotion Studio
npm run dev
```
Trình duyệt sẽ tự động mở `http://localhost:3000` để bạn xem video mẫu `SampleEmbeddedVideo` với đầy đủ âm thanh, phụ đề karaoke và hiệu ứng chuyển động!

---

### Bước 2: Tự động tạo một video mới bằng 1 dòng lệnh
```bash
npm run create -- --topic "ConTroTrongC" --title "Bản Chất Con Trỏ & Ô Nhớ RAM Từ Con Số 0"
```
Lệnh này sẽ tự động:
1. Áp dụng bộ từ điển chuẩn hóa phát âm tiếng Anh.
2. Sinh giọng đọc AI (ZeroTTS hoặc EdgeTTS) vào thư mục `public/audio/ConTroTrongC/`.
3. Tự động tính toán số frame chính xác cho từng phân cảnh.
4. Sinh trọn bộ 6 scene TSX chuẩn quy tắc xếp dọc trong `src/ConTroTrongC/scenes/`.

---

### Bước 3: Xuất video ra file MP4 Full HD chất lượng cao
```bash
npm run render -- --id "SampleEmbeddedVideo"
```
Video sẽ được kết xuất vào thư mục `out/SampleEmbeddedVideo.mp4` sẵn sàng đăng lên TikTok!

---

## 🤖 4. Hướng Dẫn Cắm Dự Án Này Vào Bất Kỳ AI Agent Nào

Khi bạn sử dụng một công cụ AI Agent khác (như **Cursor**, **Claude Code**, **Copilot Workspace**, hoặc **Antigravity**):

1. **Chỉ đường dẫn cho AI Agent**:
   - Bảo AI: *"Hãy đọc file `.agents/skills/video-creator/SKILL.md` và `AGENTS.md` trong thư mục này để nắm toàn bộ quy tắc tạo video."*
2. **Giao nhiệm vụ tạo video**:
   - *"Tạo cho tôi một video giải thích về từ khóa volatile trong C nhúng dựa trên mẫu kịch bản 6 phân cảnh."*
3. AI Agent sẽ tự động:
   - Đọc từ điển phát âm.
   - Viết kịch bản 6 cảnh.
   - Chạy lệnh `npm run create`.
   - Kiểm tra `npm run typecheck` để đảm bảo 0 lỗi.
   - Xuất video MP4 cho bạn!

---

## ⚖️ 5. Bản Quyền & Thương Hiệu
- **Kênh sản xuất**: Ngoc Einstein
- **Trang đào tạo chính thức**: [https://embedded-aiot.com](https://embedded-aiot.com)
- Thiết kế tối ưu theo tiêu chuẩn Retention Engineering cho nền tảng video ngắn (TikTok, Shorts, Reels).
