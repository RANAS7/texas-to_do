import { Router } from "express";
import { todoController } from "../controller/todo.controller";

const app=Router()

app.post("/create", todoController.create)
app.patch("/update/:id", todoController.updateTodo)

export default app