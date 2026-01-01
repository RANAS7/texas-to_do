export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: statusType;
  priority: priorityType;
  due_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export type statusType = "pending" | "in-progress" | "completed" | "cancelled";
export type priorityType = "low" | "medium" | "high";
