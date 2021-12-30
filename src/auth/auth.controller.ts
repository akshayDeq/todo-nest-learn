import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/logger/logger.interceptor';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: Users): Promise<any> {
    return this.authService.login(user);
  }
}
