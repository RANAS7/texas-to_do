import express from "express";
import cors from "cors";
import { db } from "./config/database";
import routes from "./routes/index";

const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
  res.send({
    status: "OK",
    message: "Server is healthy",
    startedAt: new Date().toISOString(),
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use("/api", routes);

db.connect()
  .then(() => {
    console.log("Database connected");
  })
  .then(() => {
    console.log("User table ensured");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
