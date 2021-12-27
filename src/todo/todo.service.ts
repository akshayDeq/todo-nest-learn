import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // get all todo entries from database
  async getTodos(): Promise<Todo[]> {
    try {
      const Todo = await this.todoRepository.find();
      return Todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // get a todo entry by ID from database
  async getTodo(todoId: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOne({ where: { id: todoId } });
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // create a new todo entry into database
  async postTodo(newTodo: { title: string }): Promise<any> {
    try {
      await this.todoRepository.insert({
        todoItems: newTodo.title,
      });
      return { description: 'Todo created successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // delete a todo entry from database
  async deleteTodo(id: number): Promise<any> {
    try {
      await this.todoRepository.delete({ id });
      return { description: `Todo deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
