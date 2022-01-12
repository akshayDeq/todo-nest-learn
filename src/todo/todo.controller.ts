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
  Req,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Todo } from '../entities/todo.entity';
// import { LoggingInterceptor } from '../utility/logger/logger.interceptor';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from 'express';
@Controller('todos')
@UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(@Req() request: Request): Promise<Todo[] | HttpException> {
    return this.todoService.getTodos(request);
  }

  @Get(':todoId')
  getTodo(
    @Req() request: Request,
    @Param('todoId', ParseIntPipe) todoId: number,
  ): Promise<Todo | HttpException> {
    return this.todoService.getTodo(todoId, request);
  }

  @Post()
  createTodo(
    @Req() request: Request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<any> {
    return this.todoService.createTodo(createTodoDto, request);
  }

  @Delete(':todoId')
  deleteTodo(
    @Req() request: Request,
    @Param('todoId', ParseIntPipe) todoId: number,
  ): Promise<any> {
    return this.todoService.deleteTodo(todoId, request);
  }

  @Patch(':todoId')
  updateTodoById(
    @Req() request: Request,
    @Param('todoId', ParseIntPipe) todoId: number,
    @Body() updatedTodoItem: UpdateTodoDto,
  ): Promise<any> {
    return this.todoService.updateTodoById(todoId, updatedTodoItem, request);
  }
}
