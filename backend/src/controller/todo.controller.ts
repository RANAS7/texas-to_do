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

  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await todoService.getAllTodo();

      const response: ApiResponse = {
        success: true,
        message: "Todos retrive successfully",
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
        message: "Todo retrive successfully",
        data: todo,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error retrive todo",
        data: error,
      };
      res.status(500).json(response);
    }
  };

  deleteTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const isDeleted = await todoService.deleteTodoById(id);
      const response: ApiResponse = {
        success: true,
        message: "Todo Deleted successfully",
        data: isDeleted,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        message: "Error deleting todo",
        data: error,
      };
      res.status(500).json(response);
    }
  };
}

export const todoController = new TodoController();
