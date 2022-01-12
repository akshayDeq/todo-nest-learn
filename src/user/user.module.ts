import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/utility/bcrypt/bcrypt.utility';
import { AuthModule } from 'src/auth/auth.module';
import { Todo } from 'src/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Todo]), AuthModule],
  controllers: [UserController],
  providers: [UserService, BcryptService],
})
export class UserModule {}
