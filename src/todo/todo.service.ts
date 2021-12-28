import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // get all todo entries from database
  async getTodos(): Promise<Todo[] | HttpException> {
    try {
      const Todos = await this.todoRepository.find();
      // return not found exception if database is empty
      if (!Todos.length) {
        return new NotFoundException('No Todos in database exist');
      }
      return Todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // get a todo entry by ID from database
  async getTodo(todoId: number): Promise<Todo | HttpException> {
    try {
      const todo = await this.todoRepository.findOne({ where: { id: todoId } });
      // return not found exception if todo with id does not exists
      if (!todo) {
        return new NotFoundException(`No todo with id:${todoId} exists`);
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // create a new todo entry into database
  async createTodo({ todoItems }: CreateTodoDto): Promise<any> {
    try {
      await this.todoRepository.insert({
        todoItems,
      });
      return { message: 'Todo created successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // delete a todo entry from database
  async deleteTodo(id: number): Promise<any> {
    try {
      // check if todo with given id exists
      const todo = await this.todoRepository.findOne({ where: { id } });
      console.log(todo);

      // return error if todo with id does not exists
      if (!todo) {
        return new BadRequestException({ message: 'todo does not exist' });
      }
      // delete the todo
      await this.todoRepository.delete({ id });
      return { message: `Todo deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
