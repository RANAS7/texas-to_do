export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: statusType;
  priority: priorityType;
  due_date?: Date;
  created_at?: string;
  updated_at?: string;
}

export type statusType = "pending" | "in-progress" | "completed" | "cancelled";
export type priorityType = "low" | "medium" | "high";
