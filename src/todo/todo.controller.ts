import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    const todos = await this.todoService.getTodos();
    return todos;
  }

  @Get(':todoId')
  async getTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    const todo = await this.todoService.getTodo(todoId);
    return todo;
  }

  @Post()
  async postTodo(@Body() createTodoDto: CreateTodoDto) {
    const todos = await this.todoService.postTodo(createTodoDto);
    return todos;
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    const todos = await this.todoService.deleteTodo(todoId);
    return todos;
  }
}
