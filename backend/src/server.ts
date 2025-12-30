import express from "express";
import cors from "cors";
import { db } from "./config/database";
import routes from "./routes";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api", routes);

db.connect()
  .then(() => {
    console.log("Database connected, starting server...");
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
