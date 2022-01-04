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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/logger/logger.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(): Promise<Users[] | HttpException> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Users | HttpException> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
