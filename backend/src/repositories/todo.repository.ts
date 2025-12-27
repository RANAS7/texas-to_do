import { db } from "../config/database";
import { Todo, TodoQuery } from "../types/todo.types";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class TodoRepository {
  async findAll(query?: TodoQuery): Promise<Todo[]> {
    const connection = db.getConnection();
    let sql = "SELECT * FROM todos WHERE 1=1";
    const params: any[] = [];

    if (query?.status) {
      sql += " AND status = ?";
      params.push(query.status);
    }

    if (query?.priority) {
      sql += " AND priority = ?";
      params.push(query.priority);
    }

    if (query?.sortBy) {
      const sortColumn =
        query.sortBy === "createdAt"
          ? "created_at"
          : query.sortBy === "dueDate"
          ? "due_date"
          : query.sortBy;
      const sortOrder = query.sortOrder === "desc" ? "DESC" : "ASC";
      sql += ` ORDER BY ${sortColumn} ${sortOrder}`;
    }

    const [rows] = await connection.execute<RowDataPacket[]>(sql, params);

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || "",
      status: row.status,
      priority: row.priority,
      dueDate: row.due_date || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async findById(id: string): Promise<Todo | null> {
    const connection = db.getConnection();
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM todos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description || "",
      status: row.status,
      priority: row.priority,
      dueDate: row.due_date || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
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
        todo.dueDate || null,
      ]
    );

    return todo;
  }

  async update(id: string, updates: Partial<Todo>): Promise<Todo | null> {
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
    if (updates.dueDate !== undefined) {
      fields.push("due_date = ?");
      values.push(updates.dueDate || null);
    }

    if (fields.length === 0) return null;

    values.push(id);
    await connection.execute<ResultSetHeader>(
      `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const connection = db.getConnection();
    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM todos WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

export const todoRepository = new TodoRepository();
