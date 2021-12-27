import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: Users): Promise<any> {
    return this.authService.login(user);
  }
}
