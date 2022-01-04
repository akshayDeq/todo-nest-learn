import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Todo } from 'src/entities/todo.entity';
import { LoggingInterceptor } from 'src/logger/logger.interceptor';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseInterceptors(LoggingInterceptor)
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
  @UseGuards(AuthGuard)
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<any> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete(':todoId')
  @UseGuards(AuthGuard)
  deleteTodo(@Param('todoId', ParseIntPipe) todoId: number): Promise<any> {
    return this.todoService.deleteTodo(todoId);
  }

  @Patch(':todoId')
  updateTodoById(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() updateTodoItems: UpdateTodoDto,
  ): Promise<any> {
    return this.todoService.updateTodoById(todoId, updateTodoItems);
  }
}
