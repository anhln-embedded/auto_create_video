import * as fs from "node:fs";
import * as path from "node:path";
import { synthesizeVoiceover } from "../tts/synthesizer";
import { SceneAudioInput } from "../tts/edge_tts_runner";

/**
 * Automates creating a brand-new Remotion explainer video project:
 * 1. Takes topic name, title, and scene scripts.
 * 2. Runs TTS voiceover generation with technical pronunciation normalizer.
 * 3. Scaffolds `src/<TopicName>/` with 6 scene files using standard templates.
 * 4. Generates `audioData.ts` and updates `src/Root.tsx`.
 */
export async function createNewVideo(options: {
  topic: string;
  title: string;
  episodeTag?: string;
  engine?: "zerotts" | "edge-tts" | "auto";
  voice?: string;
  scenes: SceneAudioInput[];
}) {
  const { topic, title, episodeTag = "TẬP 1: C/C++ NÂNG CAO", engine = "auto", voice = "quangminh", scenes } = options;

  console.log(`\n======================================================`);
  console.log(`🎬 [Auto-Create-Video] Creating new video: ${topic}`);
  console.log(`📖 Title: ${title}`);
  console.log(`🎙️ Engine: ${engine} | Voice: ${voice}`);
  console.log(`======================================================\n`);

  const topicSrcDir = path.resolve(process.cwd(), `src/${topic}`);
  const scenesDir = path.join(topicSrcDir, "scenes");
  fs.mkdirSync(scenesDir, { recursive: true });

  // 1. Synthesize audio
  await synthesizeVoiceover({
    topic,
    scenes,
    engine,
    voice,
    targetSrcDir: topicSrcDir,
  });

  // 2. Create types.ts
  const typesContent = `import { z } from "zod";

export const ${topic.charAt(0).toLowerCase() + topic.slice(1)}Schema = z.object({
  title: z.string().default("${title}"),
  episode: z.string().default("${episodeTag}"),
  channelName: z.string().default("Ngoc Einstein"),
  websiteTag: z.string().default("EMBEDDED-AIOT.COM"),
});

export type ${topic}Props = z.infer<typeof ${topic.charAt(0).toLowerCase() + topic.slice(1)}Schema>;
`;
  fs.writeFileSync(path.join(topicSrcDir, "types.ts"), typesContent, "utf-8");

  // 3. Create Scene 1 to Scene 6 files
  // Scene 1: Hook
  const scene1Content = `import React from "react";
import { Scene1HookTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene1Hook: React.FC = () => {
  return (
    <Scene1HookTemplate
      audioPath={audioManifest.scenes[0].audioPath}
      subtitleText={audioManifest.scenes[0].text}
      durationInFrames={audioManifest.scenes[0].durationInFrames}
      episodeTag="${episodeTag}"
      title="${title.toUpperCase()}"
      question="${scenes[0]?.text.slice(0, 70)}..."
      categoryBadge="CORE EMBEDDED"
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene1Hook.tsx"), scene1Content, "utf-8");

  // Scene 2: Problem
  const scene2Content = `import React from "react";
import { Scene2ProblemTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene2Problem: React.FC = () => {
  return (
    <Scene2ProblemTemplate
      audioPath={audioManifest.scenes[1].audioPath}
      subtitleText={audioManifest.scenes[1].text}
      durationInFrames={audioManifest.scenes[1].durationInFrames}
      title="CẠM BẪY KỸ THUẬT & NGUY CƠ CRASH"
      badge="PROBLEM ANALYSIS"
      icon="⚠️"
      blocks={[
        {
          icon: "🐢",
          title: "CÁCH TIẾP CẬN CŨ / THIẾU TỐI ƯU",
          description: "Gây tiêu tốn chu kỳ xung nhịp CPU, lãng phí tài nguyên RAM và dễ phát sinh lỗi ngầm!",
        },
        {
          icon: "💥",
          title: "HẬU QUẢ NGHIÊM TRỌNG TRÊN HỆ THỐNG",
          description: "Dễ gây tràn bộ nhớ, sai lệch dữ liệu truyền nhận hoặc treo cứng vi điều khiển!",
          isHighlight: true,
        },
      ]}
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene2Problem.tsx"), scene2Content, "utf-8");

  // Scene 3: Concept
  const scene3Content = `import React from "react";
import { Scene3ConceptTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene3Concept: React.FC = () => {
  return (
    <Scene3ConceptTemplate
      audioPath={audioManifest.scenes[2].audioPath}
      subtitleText={audioManifest.scenes[2].text}
      durationInFrames={audioManifest.scenes[2].durationInFrames}
      title="BẢN CHẤT KIẾN TRÚC PHẦN CỨNG"
      badge="CORE SPECS"
      icon="💡"
      specs={[
        { label: "BỘ NHỚ TIÊU THỤ", value: "Tối ưu 100%", color: "text-emerald-400" },
        { label: "TỐC ĐỘ XỬ LÝ", value: "1 Chu kỳ CPU", color: "text-cyan-300" },
        { label: "ĐỘ AN TOÀN", value: "Chuẩn MISRA-C", color: "text-amber-400" },
        { label: "TƯƠNG THÍCH", value: "ARM / ESP32", color: "text-indigo-300" },
      ]}
      highlightText="Cơ chế hoạt động tối ưu sát phần cứng giúp tiết kiệm năng lượng và băng thông!"
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene3Concept.tsx"), scene3Content, "utf-8");

  // Scene 4: Code
  const scene4Content = `import React from "react";
import { Scene4CodeTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene4Code: React.FC = () => {
  return (
    <Scene4CodeTemplate
      audioPath={audioManifest.scenes[3].audioPath}
      subtitleText={audioManifest.scenes[3].text}
      durationInFrames={audioManifest.scenes[3].durationInFrames}
      sectionTitle="MÃ NGUỒN C FIRMWARE CHUẨN SENIOR"
      filename="firmware_solution.c"
      badge="HIGH-PERFORMANCE C"
      codeContent={
        <>
          <span className="text-slate-400">// Tối ưu hóa kiến trúc nhúng</span>{"\\n"}
          <span className="text-pink-400 font-bold">typedef struct</span> {'{\\n'}
          {"    "}<span className="text-pink-400 font-bold">uint32_t</span> status_reg; <span className="text-slate-400">// Thanh ghi trạng thái</span>{"\\n"}
          {"    "}<span className="text-pink-400 font-bold">uint8_t</span>  data_buffer[<span className="text-amber-400 font-black">64</span>];{"\\n"}
          {'}'} <span className="text-cyan-300 font-bold">DeviceConfig_t</span>;{"\\n\\n"}
          <span className="text-pink-400 font-bold">void</span> <span className="text-emerald-400 font-bold">Hardware_Init</span>(<span className="text-cyan-300 font-bold">DeviceConfig_t</span> *dev);
        </>
      }
      takeaway="Cấu trúc rõ ràng, tương thích DMA và không lãng phí chu kỳ xử lý!"
      takeawayBadge="ZERO OVERHEAD"
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene4Code.tsx"), scene4Content, "utf-8");

  // Scene 5: Impact
  const scene5Content = `import React from "react";
import { Scene5ImpactTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene5Impact: React.FC = () => {
  return (
    <Scene5ImpactTemplate
      audioPath={audioManifest.scenes[4].audioPath}
      subtitleText={audioManifest.scenes[4].text}
      durationInFrames={audioManifest.scenes[4].durationInFrames}
      title="CHUẨN CÔNG NGHIỆP THỰC CHIẾN"
      badge="INDUSTRY PROVEN"
      cards={[
        {
          icon: "⚡",
          title: "Hệ Vi Điều Khiển STM32 / ARM Cortex",
          desc: "Tối ưu hóa tối đa trong các driver ngoại vi GPIO, UART, SPI, DMA theo chuẩn hãng STMicroelectronics.",
          tag: "STM32 HAL / LL",
        },
        {
          icon: "📶",
          title: "Chip IoT ESP32 / ESP-IDF",
          desc: "Áp dụng trong toàn bộ framework IoT kết nối WiFi, Bluetooth và hệ điều hành FreeRTOS.",
          tag: "ESP-IDF / FREERTOS",
          isHighlight: true,
        },
      ]}
      footerTip="Nắm vững kỹ thuật này giúp bạn tự tin ứng tuyển vị trí Senior Embedded Engineer!"
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene5Impact.tsx"), scene5Content, "utf-8");

  // Scene 6: Outro
  const scene6Content = `import React from "react";
import { Scene6OutroTemplate } from "../../templates";
import { audioManifest } from "../audioData";

export const Scene6Outro: React.FC = () => {
  return (
    <Scene6OutroTemplate
      audioPath={audioManifest.scenes[5].audioPath}
      subtitleText={audioManifest.scenes[5].text}
      durationInFrames={audioManifest.scenes[5].durationInFrames}
      nextEpisodeTitle="ĐÓN XEM CHỦ ĐỀ TIẾP THEO TRÊN KÊNH!"
      nextEpisodeTag="EPISODE NEXT ➔"
    />
  );
};
`;
  fs.writeFileSync(path.join(scenesDir, "Scene6Outro.tsx"), scene6Content, "utf-8");

  // 4. Create Main Composition File `src/<TopicName>/<TopicName>.tsx`
  const mainComponentContent = `import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { audioManifest } from "./audioData";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Concept } from "./scenes/Scene3Concept";
import { Scene4Code } from "./scenes/Scene4Code";
import { Scene5Impact } from "./scenes/Scene5Impact";
import { Scene6Outro } from "./scenes/Scene6Outro";

export const ${topic}: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const bgShift = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-950 font-sans overflow-hidden">
      {/* Ambient Radial Glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: \`radial-gradient(circle at 50% \${25 + bgShift * 0.2}%, rgba(240, 90, 40, 0.25), transparent 60%),
                       radial-gradient(circle at 80% 75%, rgba(6, 182, 212, 0.25), transparent 55%),
                       radial-gradient(circle at 20% 85%, rgba(245, 158, 11, 0.2), transparent 50%)\`,
        }}
      />

      <Series>
        <Series.Sequence durationInFrames={audioManifest.scenes[0].durationInFrames + 3}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={audioManifest.scenes[1].durationInFrames + 3}>
          <Scene2Problem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={audioManifest.scenes[2].durationInFrames + 3}>
          <Scene3Concept />
        </Series.Sequence>
        <Series.Sequence durationInFrames={audioManifest.scenes[3].durationInFrames + 3}>
          <Scene4Code />
        </Series.Sequence>
        <Series.Sequence durationInFrames={audioManifest.scenes[4].durationInFrames + 3}>
          <Scene5Impact />
        </Series.Sequence>
        <Series.Sequence durationInFrames={audioManifest.scenes[5].durationInFrames + 10}>
          <Scene6Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
`;
  fs.writeFileSync(path.join(topicSrcDir, `${topic}.tsx`), mainComponentContent, "utf-8");

  console.log(`✅ [Auto-Create-Video] Scaffolding complete for '${topic}'!`);
  console.log(`👉 Preview composition: npm run dev`);
  console.log(`👉 Render MP4: npm run render -- --id "${topic}"\n`);
}

// CLI handler
if (require.main === module) {
  const args = process.argv.slice(2);
  const topicArg = args.find((a, i) => args[i - 1] === "--topic") || "SampleVideo";
  const titleArg = args.find((a, i) => args[i - 1] === "--title") || "Tiêu Đề Video Tự Động";
  const engineArg = (args.find((a, i) => args[i - 1] === "--engine") || "auto") as "zerotts" | "edge-tts" | "auto";
  const voiceArg = args.find((a, i) => args[i - 1] === "--voice") || "quangminh";

  // Default demo scenes if none provided
  const demoScenes: SceneAudioInput[] = [
    { id: "scene1_hook", text: "Làm thế nào để tối ưu hóa hiệu năng vi điều khiển chỉ với vài dòng code C đơn giản? Hãy cùng khám phá ngay!" },
    { id: "scene2_problem", text: "Nếu viết code không cẩn thận, CPU sẽ tiêu tốn hàng nghìn chu kỳ clock vô nghĩa, làm hệ thống bị nghẽn và giật lag!" },
    { id: "scene3_concept", text: "Bí quyết nằm ở cơ chế phân bổ ô nhớ và kỹ thuật căn chỉnh dữ liệu chuẩn xác đến từng bit!" },
    { id: "scene4_code", text: "Chỉ cần áp dụng cấu trúc Struct và Union tối ưu, bạn đã loại bỏ hoàn toàn các phép tính dịch bit thừa thãi!" },
    { id: "scene5_impact", text: "Đây là chuẩn mực được các hãng chip hàng đầu như STMicroelectronics và Espressif áp dụng trong các driver công nghiệp!" },
    { id: "scene6_outro", text: "Hãy nhấn like, follow kênh Ngoc Einstein và truy cập embedded-aiot.com để nhận thêm nhiều bài học giá trị nhé!" },
  ];

  createNewVideo({
    topic: topicArg,
    title: titleArg,
    engine: engineArg,
    voice: voiceArg,
    scenes: demoScenes,
  }).catch((err) => {
    console.error("❌ Error creating video:", err);
    process.exit(1);
  });
}
