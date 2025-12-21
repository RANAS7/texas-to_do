import { Router } from "express";
import todoRoutes from "./todo.route";

const app = Router();

app.use("/todo", todoRoutes);

export default app;
