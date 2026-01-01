import { db } from "../config/database";
import { Todo } from "../types/todo.type";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    const connection = db.getConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM todos"
    );

    const todos: Todo[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || "",
      status: row.status,
      priority: row.priority,
      due_date: row.due_date || "",
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return todos;
  }

  async findById(id: number): Promise<Todo | null> {
    const connection = db.getConnection();
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM todos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0]!;
    return {
      id: row.id,
      title: row.title,
      description: row.description || "",
      status: row.status,
      priority: row.priority,
      due_date: row.due_date || "",
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(todo: Todo): Promise<Todo> {
    const connection = db.getConnection();
    await connection.execute<ResultSetHeader>(
      "INSERT INTO todos (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)",
      [
        todo.title,
        todo.description,
        todo.status,
        todo.priority,
        todo.due_date || null,
      ]
    );

    return todo;
  }

  async update(id: number, updates: Partial<Todo>): Promise<Todo | null> {
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

    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const connection = db.getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM todos WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

export const todoRepository = new TodoRepository();
