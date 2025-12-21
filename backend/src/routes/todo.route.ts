import { Router } from "express";
import { todoController } from "../controller/todo.controller";

const app = Router();

app.post("/create", todoController.createTodo);
app.patch("/update/:id", todoController.upddateTodo);
app.get("/get-all", todoController.getAllTodos);
app.get("/get/:id", todoController.getTodoById);
app.delete("/delete/:id", todoController.deleteTodo);

export default app;
