import { z } from "zod";

export const loginSchema = z.object({
  userId: z.string().trim().min(1, "User ID is required"),

  password: z.string().trim().min(1, "Password is required"),
});

export const createTestSchema = z.object({
  name: z.string().trim().min(1, "Test name is required"),

  subject: z.string().trim().min(1, "Subject is required"),

  topic: z.string().trim().min(1, "Topic is required"),

  subTopic: z.string().trim().min(1, "Sub Topic is required"),

  difficulty: z.enum(["easy", "medium", "difficult"]),

  totalTime: z.coerce.number().min(1, "Duration is required"),

  wrongMarks: z.coerce.number(),

  unattemptMarks: z.coerce.number(),

  correctMarks: z.coerce
    .number()
    .int("Correct marks must be a whole number")
    .gt(0, "Correct marks must be greater than 0"),

  totalQuestions: z.coerce
    .number()
    .int("Total questions must be a whole number")
    .gt(0, "Total questions must be greater than 0"),

  totalMarks: z.coerce
    .number()
    .int("Total marks must be a whole number")
    .gt(0, "Total marks must be greater than 0"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateTestFormData = z.infer<typeof createTestSchema>;
