import { z } from "zod";

export const sampleEmbeddedVideoSchema = z.object({
  title: z.string().default("Đỉnh Cao Firmware: Struct Bitfield + Union + Enum"),
  episode: z.string().default("TẬP 7.5: C/C++ NÂNG CAO"),
  channelName: z.string().default("Ngoc Einstein"),
  websiteTag: z.string().default("EMBEDDED-AIOT.COM"),
});

export type SampleEmbeddedVideoProps = z.infer<typeof sampleEmbeddedVideoSchema>;
