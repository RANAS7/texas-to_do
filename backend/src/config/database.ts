import mysql from "mysql2/promise";

class Database {
  private connection: mysql.Connection | null = null;

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "to_do",
      });

      await this.createTables();
      console.log("✅ Connected to MySQL database");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id serial PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'in-progress', 'completed', 'cancelled') DEFAULT 'pending',
        priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await this.connection!.execute(createTableQuery);
  }

  getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error("Database not connected");
    }
    return this.connection;
  }
}

export const db = new Database();
