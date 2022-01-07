import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        BcryptService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
      imports: [JwtModule.register({ secret: 'mockpass' })],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
