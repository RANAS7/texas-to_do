export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status: statusType;
  priority: priorityType;
  due_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

type statusType = "pending" | "in-progress" | "completed" | "cancelled";
type priorityType = "low" | "medium" | "high";
