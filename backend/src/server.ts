import express from "express";
import cors from "cors";
import routes from "./routes";
import { db } from "./config/database";
import { PORT, CORS_ORIGIN } from "./config/env";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);

const startServer = async () => {
  try {
    await db.connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API available at http://localhost:${PORT}/api`);
      console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
