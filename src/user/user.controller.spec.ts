import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../entities/user.entity';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

describe('user controller unit tests', () => {
  let userController: UserController;
  let spyService: UserService;
  let usersRepository: Repository<Users>;

  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        AuthService,
        UserService,
        BcryptService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
      imports: [JwtModule.register({ secret: 'mockpass' })],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    spyService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(spyService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });
});
