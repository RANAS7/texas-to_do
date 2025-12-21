import { todoRepo } from "../repo/todo.repo";
import { Todo } from "../types/todo.type";

class TodoService {
  async createTodo(todo: Todo): Promise<Todo | null> {
    return await todoRepo.createTodo(todo);
  }

  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo | null> {
    return await todoRepo.updateTodo(id, todo);
  }

  async deleteTodo(id: number): Promise<boolean> {
    return await todoRepo.deleteTodo(id);
  }

  async getTodoById(id: number): Promise<Todo | null> {
    return await todoRepo.findTodoById(id);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await todoRepo.findAllTodos();
  }
}

export const todoService = new TodoService();
