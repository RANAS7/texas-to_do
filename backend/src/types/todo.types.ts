export type Status = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  dueDate?: string;
}

export interface TodoQuery {
  status?: Status;
  priority?: Priority;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}