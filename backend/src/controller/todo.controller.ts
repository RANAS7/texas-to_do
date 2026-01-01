import { Request, Response } from "express";
import { Todo } from "../types/todo.type";
import { todoService } from "../service/todo.service";
import { ApiResponse } from "../types/response.type";

class TodoController {
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const todo: Todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
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

  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);

      const todo: Partial<Todo> = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        due_date: req.body.due_date,
      };

      const updatedTodo = await todoService.updateTodo(id, todo);

      const response: ApiResponse = {
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error updating todo",
        error: error,
      };

      res.status(500).json(response);
    }
  };
}

export const todoController = new TodoController();
