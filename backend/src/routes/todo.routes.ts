import { Router } from "express";
import { todoController } from "../controller/todo.controller";

const app = Router();

app.post("/create", todoController.createTodo);

export default app;
