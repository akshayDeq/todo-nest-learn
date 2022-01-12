import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Users } from '../entities/user.entity';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // get all todo entries from database
  async getTodos(request): Promise<Todo[] | HttpException> {
    try {
      const { username } = request.headers;
      const user = await this.usersRepository.findOne({ where: { username } });
      const Todos = await this.todoRepository.find({
        where: { user_id: user.id },
      });

      return Todos;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // get a todo entry by ID from database
  async getTodo(todoId: number, request): Promise<Todo | HttpException> {
    try {
      const { username } = request.headers;
      const user = await this.usersRepository.findOne({ where: { username } });
      const todo = await this.todoRepository.findOne({
        where: { id: todoId, user_id: user.id },
      });
      // return error if todo with todoId for logged in user does not exists
      if (!todo) {
        return new BadRequestException({ message: 'todo does not exist' });
      }

      return todo;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // create a new todo entry into database
  async createTodo({ todoItem }: CreateTodoDto, request): Promise<any> {
    try {
      const { username } = request.headers;
      const user = await this.usersRepository.findOne({ where: { username } });
      await this.todoRepository.insert({
        todoItem,
        user_id: user.id,
      });

      return { message: 'Todo created successfully' };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // delete a todo entry from database
  async deleteTodo(todoId: number, request): Promise<any> {
    try {
      const { username } = request.headers;
      const user = await this.usersRepository.findOne({ where: { username } });
      // check if todo with given id exists
      const todo = await this.todoRepository.findOne({
        where: { id: todoId, user_id: user.id },
      });
      // return error if todo with todoId for logged in does not exists
      if (!todo) {
        return new BadRequestException({ message: 'todo does not exist' });
      }
      // delete the todo
      await this.todoRepository.delete({ id: todoId });

      return { message: `Todo deleted successfully` };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  // update an existing todo
  async updateTodoById(
    todoId: number,
    { updateTodoItem }: UpdateTodoDto,
    request,
  ): Promise<any> {
    try {
      const { username } = request.headers;
      const user = await this.usersRepository.findOne({ where: { username } });
      // check if the todo with todoId for logged in user exists in database
      const todo = await this.todoRepository.findOne({
        where: { id: todoId, user_id: user.id },
      });
      // return an exception if todoId does not exist
      if (!todo) {
        return new BadRequestException({ message: 'todo does not exist' });
      }
      // update the todo data
      await this.todoRepository.update(
        { id: todoId },
        { todoItem: updateTodoItem },
      );

      return { message: 'Todo updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
