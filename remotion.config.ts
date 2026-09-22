import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";
import { existsSync } from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Support both Windows standard Chrome and Edge paths
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (existsSync(chromePath)) {
  Config.setBrowserExecutable(chromePath);
} else if (existsSync(edgePath)) {
  Config.setBrowserExecutable(edgePath);
}
