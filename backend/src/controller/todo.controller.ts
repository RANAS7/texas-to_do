import { Request, Response } from "express";
import { todoService } from "../service/todo.service";
import { ApiResponse } from "../types/response";
import { Todo } from "../types/todo.type";

class TodoController {
  createTodo = async (req: Request, res: Response): Promise<void> => {
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
      res.status(500).json({
        success: false,
        message: "Error creating todo",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  upddateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const updates: Partial<Todo> = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        due_date: req.body.due_date,
      };

      const updatedTodo = await todoService.updateTodo(id, updates);

      if (!updatedTodo) {
        const response: ApiResponse = {
          success: false,
          message: "Todo not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating todo",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await todoService.getAllTodos();

      const response: ApiResponse = {
        success: true,
        message: "Todos retrieved successfully",
        data: todos,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to retrieve todos",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await todoService.getTodoById(parseInt(id!));

      if (!todo) {
        const response: ApiResponse = {
          success: false,
          message: "Todo not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: "Todo retrieved successfully",
        data: todo,
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to retrieve todo",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await todoService.deleteTodo(parseInt(id!));

      if (!deleted) {
        const response: ApiResponse = {
          success: false,
          message: "Todo not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: "Todo deleted successfully",
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to delete todo",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };
}

export const todoController = new TodoController();
