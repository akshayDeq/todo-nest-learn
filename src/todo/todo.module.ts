import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Todo } from 'src/entities/todo.entity';
import { Users } from 'src/entities/user.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Users]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
