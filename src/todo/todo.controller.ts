import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    try {
      const todos = await this.todoService.getTodos();
      return todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':todoId')
  async getTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    try {
      const todo = await this.todoService.getTodo(todoId);
      return todo;
    } catch (error) {
      throw new InternalServerErrorException({
        description: `No todo with id:${todoId} found`,
      });
    }
  }

  @Post()
  async postTodo(@Body() createTodoDto: CreateTodoDto) {
    try {
      const todos = await this.todoService.postTodo(createTodoDto);
      return todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    try {
      const todos = await this.todoService.deleteTodo(todoId);
      return todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':todoId')
  async addTodoItems(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() todoItems: UpdateTodoDto[],
  ) {
    try {
      const todos = await this.todoService.addMoreTodoItems(todoId, todoItems);
      return todos;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
