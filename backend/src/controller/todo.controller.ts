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

  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await todoService.getAllTodos();

      const response: ApiResponse = {
        success: true,
        message: "Todos fetched successfully",
        data: todos,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error fetching todos",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);

      const todo = await todoService.getTodoById(id);

      const response: ApiResponse = {
        success: true,
        message: "Todo fetched successfully",
        data: todo,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error fetching todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);

      const deleted = await todoService.deleteTodo(id);

      const response: ApiResponse = {
        success: true,
        message: "Todo deleted successfully",
        data: deleted,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error deleting todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };
}

export const todoController = new TodoController();
