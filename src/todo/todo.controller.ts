import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Todo } from 'src/entities/todo.entity';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Promise<Todo[] | HttpException> {
    return this.todoService.getTodos();
  }

  @Get(':todoId')
  getTodo(
    @Param('todoId', ParseIntPipe) todoId: number,
  ): Promise<Todo | HttpException> {
    return this.todoService.getTodo(todoId);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<any> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete(':todoId')
  deleteTodo(@Param('todoId', ParseIntPipe) todoId: number): Promise<any> {
    return this.todoService.deleteTodo(todoId);
  }
}
