import { Request, Response } from "express";
import { ApiResponse } from "../types/response.types";
import { CreateTodoDto, UpdateTodoDto, TodoQuery } from "../types/todo.types";
import { todoService } from "../services/todo.service";

export class TodoController {
  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: TodoQuery = {
        status: req.query.status as any,
        priority: req.query.priority as any,
        sortBy: req.query.sortBy as any,
        sortOrder: req.query.sortOrder as any,
      };

      const todos = await todoService.getAllTodos(query);

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
      const todo = await todoService.getTodoById(id);

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

  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const createTodoDto: CreateTodoDto = req.body;
      const todo = await todoService.createTodo(createTodoDto);

      const response: ApiResponse = {
        success: true,
        message: "Todo created successfully",
        data: todo,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to create todo",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateTodoDto: UpdateTodoDto = req.body;

      const todo = await todoService.updateTodo(id, updateTodoDto);

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
        message: "Todo updated successfully",
        data: todo,
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Failed to update todo",
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await todoService.deleteTodo(id);

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
