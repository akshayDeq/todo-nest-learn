import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './entities/todo.entity';
import { Users } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { BcryptService } from './utilities/bcrypt/bcrypt.utility';
import { BcryptModule } from './utilities/bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Todo, Users],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    BcryptModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, BcryptService],
})
export class AppModule {}
