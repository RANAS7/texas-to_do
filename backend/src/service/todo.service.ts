import { todoRepository } from "../repo/todo.repository";
import { Todo } from "../types/todo.type";

class TodoService{
    async createTodo(todo:Todo):Promise<Todo>{
       return todoRepository.create(todo)
    }

    async updateTodo(id:number,todo:Partial<Todo>):Promise<Todo|null>{
       return todoRepository.update(id,todo)
    }

    async getAllTodo():Promise<Todo[]>{
        return todoRepository.findAll()
    }

    async getTodoById(id:number):Promise<Todo|null>{
        return todoRepository.findById(id)
    }

    async deleteTodoById(id:number):Promise<boolean>{
        return todoRepository.delete(id)
    }

}

export const todoService=new TodoService()