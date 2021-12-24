import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/bcrypt/bcrypt.utility';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, BcryptService],
})
export class UserModule {}
