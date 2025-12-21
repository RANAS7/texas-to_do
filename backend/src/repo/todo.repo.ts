import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/database";
import { Todo } from "../types/todo.type";

class TodoRepo {
  // Create a new todo item
  async createTodo(todo: Todo): Promise<Todo | null> {
    const conn = db.getConnection();

    const result = await conn.execute<ResultSetHeader>(
      `INSERT INTO todos (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)`,
      [todo.title, todo.description, todo.status, todo.priority, todo.due_date]
    );

    return this.findTodoById(result[0].insertId);
  }

  // Update an existing todo item
  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | null> {
    const connection = db.getConnection();
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) {
      fields.push("title = ?");
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push("description = ?");
      values.push(updates.description);
    }
    if (updates.status !== undefined) {
      fields.push("status = ?");
      values.push(updates.status);
    }
    if (updates.priority !== undefined) {
      fields.push("priority = ?");
      values.push(updates.priority);
    }
    if (updates.due_date !== undefined) {
      fields.push("due_date = ?");
      values.push(updates.due_date || null);
    }

    if (fields.length === 0) return null;

    values.push(id);
    await connection.execute<ResultSetHeader>(
      `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return await this.findTodoById(id);
  }

  // Delete a todo item by ID
  async deleteTodo(id: number): Promise<boolean> {
    const conn = db.getConnection();

    const [result] = await conn.execute<ResultSetHeader>(
      `DELETE FROM todos WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }

  async findAllTodos(): Promise<Todo[]> {
    const conn = db.getConnection();
    const [rows] = await conn.execute<RowDataPacket[]>(
      `SELECT t.id, t.title, t.description, t.due_date, t.status, t.priority, t.created_at, t.updated_at FROM todos t`
    );

    const todos: Todo[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      due_date: row.due_date,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return todos;
  }

  async findTodoById(id: number): Promise<Todo | null> {
    const conn = db.getConnection();
    const [rows] = await conn.execute<RowDataPacket[]>(
      `SELECT t.id, t.title, t.description, t.due_date, t.status, t.priority, t.created_at, t.updated_at FROM todos t WHERE t.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0]!;
    const todo: Todo = {
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      due_date: row.due_date,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    return todo;
  }
}

export const todoRepo = new TodoRepo();
