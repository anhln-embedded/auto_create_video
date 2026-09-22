import { z } from "zod";

export const aiBirthExplainerSchema = z.object({
  title: z.string().default("Hóa Ra AI Ra Đời Đỉnh Chóp Như Thế Nào?"),
  episode: z.string().default("HÀNH TRÌNH 70 NĂM LỊCH SỬ AI"),
  channelName: z.string().default("Ngoc Einstein"),
  websiteTag: z.string().default("EMBEDDED-AIOT.COM"),
});

export type AIBirthExplainerProps = z.infer<typeof aiBirthExplainerSchema>;
