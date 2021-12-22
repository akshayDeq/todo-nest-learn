import { HttpException, Injectable } from '@nestjs/common';
import { TODOS } from './todo.mock.data';

@Injectable()
export class TodoService {
  todos = TODOS;

  getTodos(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.todos);
    });
  }

  getTodo(todoId): Promise<any> {
    return new Promise((resolve) => {
      const todo = this.todos.find((todo) => todo.id === todoId);
      if (!todo) {
        throw new HttpException(`No todo with ${todoId} ID exists`, 404);
      }
      resolve(todo);
    });
  }

  postTodo(newTodo: { id: number; title: string[] }): Promise<any> {
    return new Promise((resolve) => {
      const checkForUniqueID = this.todos.find(
        (todo) => todo.id === newTodo.id,
      );
      if (checkForUniqueID) {
        throw new HttpException(`ID already exists`, 404);
      }
      this.todos.push(newTodo);
      resolve(this.todos);
    });
  }

  deleteTodo(id: number): Promise<any> {
    return new Promise((resolve) => {
      const checkIfIdExists = this.todos.find((todo) => todo.id === id);
      if (!checkIfIdExists) {
        throw new HttpException(`No such ID exists`, 404);
      }
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
      resolve(this.todos);
    });
  }
}
