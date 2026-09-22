---
name: video-creator
description: >-
  Automated short-form vertical explainer video creation toolkit (9:16 format, 1080x1920 @ 30fps)
  powered by Remotion and AI Voiceover (ZeroTTS / EdgeTTS) with built-in Vietnamese technical pronunciation dictionary.
---

# Video Creator Agent Skill (Auto_create_video)

Welcome! You are operating within **Auto_create_video**, a complete, modular, self-contained automated video generation pipeline tailored for **Embedded Systems, AIoT, C/C++ Firmware, and Tech Tutorials** branded for **Ngoc Einstein** and **[embedded-aiot.com](https://embedded-aiot.com)**.

Any AI Agent (Antigravity, Cursor, Claude Code, Copilot, or custom LLM) can immediately read this file and generate professional, viral 50-70s vertical videos (1080x1920 @ 30fps) with AI voiceover and karaoke subtitles.

---

## 🏗️ 1. Project Architecture

```text
Auto_create_video/
├── .agents/skills/video-creator/
│   ├── SKILL.md                 # (THIS FILE) Comprehensive operational rules for AI agents
│   └── PROMPT_TEMPLATE.md       # Standard prompt for converting markdown lessons to scenes
├── config/
│   ├── pronunciation_dict.json  # Dictionary mapping technical terms to natural Vietnamese phonetics
│   └── voice_config.json        # Voice & video resolution configuration
├── core/
│   ├── tts/                     # Synthesizer with automatic pronunciation normalizer
│   │   ├── normalizer.ts
│   │   ├── synthesizer.ts
│   │   ├── edge_tts_runner.ts
│   │   └── zerotts_runner.py
│   └── pipeline/                # Automation CLI runners
│       ├── create_video.ts
│       └── render_video.ts
├── src/
│   ├── components/              # BrandHeader, SubtitleBox, CodeBlockCard, HardwareSpecCard, WebsiteOutroCard
│   ├── templates/               # 6 standard scene templates (Hook, Problem, Concept, Code, Impact, Outro)
│   ├── examples/                # Working reference implementations
│   ├── Root.tsx                 # Remotion Composition Registry
│   └── index.ts
└── public/
    └── audio/                   # Generated MP3 voiceover files & manifests
```

---

## ⚡ 2. The 6-Scene Formula (50 - 70s / 1500 - 2100 frames @ 30fps)

Every high-retention technical short video follows this 6-scene formula:

| Scene | Name | Time | Purpose & Visuals |
| :--- | :--- | :--- | :--- |
| **1** | **Hook** | 0s – 10s | **Catastrophe Hook**: Shocking question, system crash, or counter-intuitive fact. Big Title, Episode Tag, Brand Header. |
| **2** | **Problem / Trap** | 10s – 20s | The technical bottleneck: Memory leaks, CPU cycle waste, or ISR collision. Uses `ComparisonCard` (Wrong vs Right). |
| **3** | **Core Mechanism** | 20s – 35s | Hardware reality: Explains the internal CPU/RAM structure using `HardwareSpecCard` (Clock, RAM, Flash, Registers). |
| **4** | **Senior Code** | 35s – 50s | Production-grade C/C++ solution using `CodeBlockCard` with **LARGE, CRISP FONTS (`text-[23px]`)**. |
| **5** | **Industry Impact** | 50s – 60s | Real-world usage in industry: STM32 HAL, ESP-IDF, FreeRTOS, Automotive MISRA-C using `ImpactCard`. |
| **6** | **Outro & CTA** | 60s – 70s | Next episode teaser (Open Loop) + `WebsiteOutroCard` with CTA directing to `embedded-aiot.com`. |

---

## 🎙️ 3. Audio & Pronunciation Normalization Rules

### Crucial Pronunciation Guidelines:
1. **Brand Name**: Always protect `Ngoc Einstein`. Do NOT let TTS say "Ngọc Anh-xtanh"!
2. **Technical Terms**: Must use the phonetic dictionary in `config/pronunciation_dict.json`:
   - `Big Endian` / `Little Endian` ➔ `Bích En-đi-ơn` / `Lít-tồ En-đi-ơn`
   - `MSB` / `LSB` ➔ `M-S-B` / `L-S-B`
   - `Struct`, `Union`, `Enum`, `Bitfield` ➔ `xờ-trắc`, `u-ni-ơn`, `e-num`, `bít-phiêu`
   - `volatile`, `static`, `extern`, `register` ➔ `vô-la-tai`, `sta-tíc`, `ếch-tơn`, `re-gít-stơ`
   - `Padding` ➔ `Pát-đinh`
   - `Type Punning` ➔ `Típ Pan-ninh`
   - `__attribute__((packed))` ➔ `attribute pắc`
   - `UART`, `DMA`, `STM32`, `ESP32` ➔ `U-ÁT`, `D-M-A`, `S-T-M-32`, `E-S-P-32`

---

## 📐 4. Visual Layout & Remotion Rules (9:16 - 1080x1920)

> [!CRITICAL]
> **Rule 1: THOÁT KHỎI BẪY DASHBOARD - ÁP DỤNG KIẾN TRÚC 4 LỚP CHUYỂN ĐỘNG (4-LAYER MOTION STACK)**
> - CẤM biến video thành các hộp chữ nhật chứa đoạn văn tĩnh như web dashboard. Người xem lướt video ngắn không đọc chữ dài!
> - **Layer 1 (Nền)**: Full-Bleed Motion Background phủ kín 100% màn hình (`blur-2xl opacity-40`) + tia sáng Ambient Glow/hạt bụi di chuyển. CẤM để nền đen tĩnh.
> - **Layer 2 (Hero Visual)**: Ảnh/Video thực tế chiếm 50–70% màn hình ở vị trí trung tâm mắt nhìn (từ `y = 350px` đến `y = 1150px`), phong cách Sticker/Collage phát sáng Neon (`shadow-[0_0_35px]`) + Ken-Burns zoom nhẹ (`scale: 1.0 ➔ 1.08`).
> - **Layer 3 (Keyword Badges)**: CẤM viết cả câu văn. Chỉ thả các thẻ từ khóa / con số giật gân nảy theo nhịp giọng đọc (`spring() pop-in`).
> - **Layer 4 (Kinetic Subtitles)**: Phụ đề Karaoke chữ to (`text-5xl` - `text-6xl font-black`), đặt tại `bottom: 180px` - `220px` (trên vùng cấm đáy của TikTok), highlight từ đang đọc màu vàng kim.

> [!CRITICAL]
> **Rule 2: LARGE MOBILE FONTS & KEYWORDS ONLY**
> Never use `text-xs` or `text-sm` for explanations. Titles must be `text-3xl` to `text-4xl font-black`, keywords `text-2xl font-bold`, code blocks `text-[22px]` to `text-[26px]`, stats `text-4xl` to `text-5xl`.

> [!IMPORTANT]
> **Rule 3: TIKTOK SAFE ZONES (1080x1920)**
> - Top Danger Zone: `y = 0 ➔ 180px` (TikTok tabs, search). Chỉ để BrandHeader nhỏ.
> - Right Danger Zone: `x = 940 ➔ 1080px` (Like, Comment, Share).
> - Bottom Danger Zone: `y = 1460 ➔ 1920px` (Caption dài, audio disk, time bar).
> - **VÙNG AN TOÀN VÀNG**: `x: 60 ➔ 920px`, `y: 200 ➔ 1440px` (Chứa toàn bộ Hero Visual, Badges và Subtitles).

---

## 🚀 5. How Any AI Agent Produces a New Video (Step-by-Step)

### Step 1: Prepare the Script
Generate a 6-scene script with `id` and `text` (see `PROMPT_TEMPLATE.md`).

### Step 2: Synthesize Audio
Run the CLI generator or invoke `synthesizeVoiceover()`:
```bash
npm run create -- --topic "MyVideoTopic" --title "Tiêu Đề Video Của Bạn"
```
This automatically:
- Synthesizes all 6 voiceover MP3 files into `public/audio/<topic>/`.
- Calculates exact frame durations.
- Generates `src/<topic>/audioData.ts`.
- Scaffolds all 6 scene TSX files in `src/<topic>/scenes/`.

### Step 3: Register in `src/Root.tsx`
Add your new composition into `src/Root.tsx`:
```tsx
<Composition
  id="MyVideoTopic"
  component={MyVideoTopic}
  durationInFrames={totalFrames}
  fps={30}
  width={1080}
  height={1920}
/>
```

### Step 4: Preview or Render
- Preview in Remotion Studio:
  ```bash
  npm run dev
  ```
- Render MP4:
  ```bash
  npm run render -- --id "MyVideoTopic"
  ```

---

## 🧹 6. Quy Chuẩn Quản Lý File Tạm Khi AI Tạo Giao Diện (Workspace Cleanliness)

Khi AI phát triển giao diện mới, render kiểm tra bố cục hoặc thử nghiệm âm thanh:

1. **Mọi file ảnh chụp màn hình (preview/still) BẮT BUỘC lưu vào thư mục `tmp/` hoặc `public/tmp/`**:
   - Khi chạy lệnh `npx remotion still`, luôn chỉ định đường dẫn lưu trong `tmp/`:
     ```bash
     npx remotion still src/index.ts MyVideoTopic tmp/preview-scene1.png --frame=60
     ```
   - **NGHIÊM CẤM** xuất file test trực tiếp ra thư mục gốc (`4.png`, `test.png`, `test-sample.png`).
2. **File âm thanh thử nghiệm & kịch bản nháp**:
   - Các file sinh thử (`test_voice.mp3`, `test.wav`) và file nháp phải đặt trong `tmp/` hoặc `scratch/`.
3. **Đảm bảo tự động bỏ qua qua `.gitignore`**:
   - Các thư mục `tmp/`, `temp/`, `scratch/`, `scripts/tmp/`, `public/tmp/`, `public/preview/`, cùng các định dạng `*.tmp`, `*.log`, `test_*.png`, `test-*.png` đã được cấu hình trong `.gitignore` để không làm bẩn git repository.
