import { Request, Response } from "express";
import { Todo } from "../model/todo.model";
import { todoService } from "../service/todo.service";
import { ApiResponse } from "../types/ApiResponse.type";

class TodoController {
  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todo: Todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.staus,
        priority: req.body.priority,
        due_date: req.body.due_date,
      };

      const newTodo = await todoService.createTodo(todo);

      const response: ApiResponse = {
        success: true,
        message: "Todo created successfully",
        data: newTodo,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error creating todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };
}

export const todoController = new TodoController();
