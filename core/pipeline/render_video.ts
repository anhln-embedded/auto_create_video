import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Automates rendering a Remotion composition to an MP4 video file.
 */
export async function renderCompositionToMp4(options: {
  compositionId: string;
  outputFile?: string;
  concurrency?: number;
}) {
  const { compositionId, concurrency = 2 } = options;
  const outDir = path.resolve(process.cwd(), "out");
  fs.mkdirSync(outDir, { recursive: true });

  const outputFile = options.outputFile || path.join(outDir, `${compositionId}.mp4`);

  console.log(`\n======================================================`);
  console.log(`🎥 [Auto-Render] Rendering Composition: ${compositionId}`);
  console.log(`📂 Output file: ${outputFile}`);
  console.log(`======================================================\n`);

  const args = [
    "remotion",
    "render",
    compositionId,
    outputFile,
    `--concurrency=${concurrency}`,
    "--overwrite",
  ];

  return new Promise<void>((resolve, reject) => {
    const proc = spawn("npx", args, { stdio: "inherit", shell: true });

    proc.on("close", (code) => {
      if (code === 0) {
        console.log(`\n🎉 [Auto-Render] Successfully rendered ${outputFile}!`);
        resolve();
      } else {
        reject(new Error(`Remotion render exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

// CLI handler
if (require.main === module) {
  const args = process.argv.slice(2);
  const idArg = args.find((a, i) => args[i - 1] === "--id") || "SampleEmbeddedVideo";
  const outArg = args.find((a, i) => args[i - 1] === "--out");

  renderCompositionToMp4({
    compositionId: idArg,
    outputFile: outArg,
  }).catch((err) => {
    console.error("❌ Render failed:", err);
    process.exit(1);
  });
}
