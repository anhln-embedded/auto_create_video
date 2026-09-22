import { z } from "zod";

export const videoExplainerSchema = z.object({
  title: z.string().default("Tiêu Đề Video"),
  episode: z.string().default("TẬP 1: C/C++ NÂNG CAO"),
  channelName: z.string().default("Ngoc Einstein"),
  websiteTag: z.string().default("EMBEDDED-AIOT.COM"),
});

export type VideoExplainerProps = z.infer<typeof videoExplainerSchema>;
