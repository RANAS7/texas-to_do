import { Router } from "express";
import { todoController } from "../controller/todo.controller";

const app = Router();

app.post("/create", todoController.createTodo);
app.patch("/update/:id", todoController.updateTodo);
app.delete("/delete/:id", todoController.deleteTodo);
app.get("/get/:id", todoController.getTodoById);
app.get("/get-all", todoController.getAllTodos);

export default app;
