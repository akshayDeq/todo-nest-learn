import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':todoId')
  getTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.todoService.getTodo(todoId);
  }

  @Post()
  postTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.postTodo(createTodoDto);
  }

  @Delete(':todoId')
  async deleteTodo(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.todoService.deleteTodo(todoId);
  }
}
