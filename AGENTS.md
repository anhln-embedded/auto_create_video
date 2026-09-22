# AGENTS.md - Hướng Dẫn Vận Hành Dành Cho AI Agent

Chào bạn! Đây là dự án **Auto_create_video** – hệ thống tự động hóa sản xuất video dọc 9:16 (TikTok / YouTube Shorts / Reels) với Remotion và AI Voiceover (ZeroTTS CPU / EdgeTTS).

## 📌 Cách Bạn Bắt Đầu Làm Việc:

1. **Đọc tài liệu kỹ năng đầy đủ**:
   - Mở và đọc: `.agents/skills/video-creator/SKILL.md`
2. **Quy tắc thiết kế cốt lõi**:
   - **XẾP DỌC 100%**: Mọi khối nội dung, code, so sánh xếp từ trên xuống dưới (`flex flex-col gap-4`). CẤM chia đôi ngang `grid-cols-2` cho code.
   - **FONT CODE LỚN**: Tối thiểu `text-[22px]` đến `text-[26px]`, không dùng `text-xs`.
   - **VÙNG AN TOÀN**: `BrandHeader` tại `top: 140px`, `SubtitleBox` tại `bottom: 160px`.
   - **PHÁT ÂM TIẾNG ANH**: Kiểm tra và sử dụng từ điển tại `config/pronunciation_dict.json`. Giữ nguyên `Ngoc Einstein`.
3. **Các lệnh điều hành**:
   - Xem trước giao diện: `npm run dev`
   - Tạo video mới tự động: `npm run create -- --topic "TenVideo" --title "Tiêu đề video"`
   - Xuất video MP4: `npm run render -- --id "TenVideo"`
   - Kiểm tra lỗi TypeScript: `npm run typecheck`
