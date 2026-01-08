import { z, ZodError } from "zod";

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: statusType;
  priority: priorityType;
  due_date?: string | undefined;
  created_at?: Date;
  updated_at?: Date;
}

export type statusType = "pending" | "in-progress" | "completed" | "cancelled";
export type priorityType = "low" | "medium" | "high";

export const todoSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["pending", "in-progress", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;

export const errorCutomizer = async (err: ZodError) => {
  const errorPath =
    err instanceof ZodError ? String(err.issues[0].path[0]) : "Unknown";
  const errorMessage =
    err instanceof ZodError ? err.issues[0].message : "An error occurred";
  return { errorPath, errorMessage };
};
