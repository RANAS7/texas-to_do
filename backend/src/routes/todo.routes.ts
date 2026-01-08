import { Router } from "express";
import { todoController } from "../controller/todo.controller";

const app = Router();

app.post("/create", todoController.create);
app.patch("/update/:id", todoController.updateTodo);
app.get("/get-all", todoController.getAllTodos);
app.get("/get/:id", todoController.getTodoById);
app.delete("/delete/:id", todoController.deleteTodoById);

export default app;
