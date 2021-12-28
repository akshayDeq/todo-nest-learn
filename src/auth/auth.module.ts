import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/utilities/bcrypt/bcrypt.utility';
import { Users } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secretOrPrivateKey: 'secretkey',
    }),
  ],
  providers: [BcryptService, AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
