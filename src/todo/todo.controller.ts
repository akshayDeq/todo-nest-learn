import {
  Body,
  Controller,
  Delete,
  Get,
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
      return error;
    }
  }

  @Get(':todoId')
  async getTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    try {
      const todo = await this.todoService.getTodo(todoId);
      return todo;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async postTodo(@Body() createTodoDto: CreateTodoDto) {
    try {
      const todos = await this.todoService.postTodo(createTodoDto);
      return todos;
    } catch (error) {
      return error;
    }
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    try {
      const todos = await this.todoService.deleteTodo(todoId);
      return todos;
    } catch (error) {
      return error;
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
      return error;
    }
  }
}
