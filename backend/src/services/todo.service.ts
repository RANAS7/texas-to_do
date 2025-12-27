import { v4 as uuidv4 } from "uuid";
import {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  TodoQuery,
} from "../types/todo.types";
import { todoRepository } from "../repositories/todo.repository";

export class TodoService {
  async getAllTodos(query?: TodoQuery): Promise<Todo[]> {
    return await todoRepository.findAll(query);
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return await todoRepository.findById(id);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: uuidv4(),
      title: createTodoDto.title,
      description: createTodoDto.description || "",
      status: "pending",
      priority: createTodoDto.priority,
      dueDate: createTodoDto.dueDate || "",
      createdAt: now,
      updatedAt: now,
    };

    return await todoRepository.create(todo);
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<Todo | null> {
    const existingTodo = await todoRepository.findById(id);
    if (!existingTodo) {
      return null;
    }

    return await todoRepository.update(id, updateTodoDto);
  }

  async deleteTodo(id: string): Promise<boolean> {
    const existingTodo = await todoRepository.findById(id);
    if (!existingTodo) {
      return false;
    }

    return await todoRepository.delete(id);
  }
}

export const todoService = new TodoService();
