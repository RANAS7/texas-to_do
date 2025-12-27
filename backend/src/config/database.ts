import mysql from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "./env";
import { ALL_TABLES } from "./schema";

class Database {
  private connection: mysql.Connection | null = null;

  async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: DB_HOST,
        port: parseInt(DB_PORT!),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });

      await this.createTables();
      console.log("✅ Connected to MySQL database");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    for (const tableQuery of ALL_TABLES) {
      await this.connection!.execute(tableQuery);
    }
  }

  getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error("Database not connected");
    }
    return this.connection;
  }
}

export const db = new Database();
