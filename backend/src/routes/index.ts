import { Router } from "express";
import todoRoutes from "./todo.routes";

const app = Router();

app.use("/todo", todoRoutes);

export default app;
