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
  // let usersRepository: Repository<Users>;

  const mockUserService = {
    getUsers: jest.fn(() => {
      return [{}];
    }),
    createUser: jest.fn((dto) => {
      return { id: Date.now(), username: dto.username, password: dto.password };
    }),
    getUserById: jest.fn((id) => {
      return { id, username: 'akshay', password: 'hashpass' };
    }),
    deleteUser: jest.fn((id) => {
      return { message: `userId:${id} deleted successfully` };
    }),
  };

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
    // usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(spyService).toBeDefined();
  });

  it('should return all users', () => {
    expect(userController.getUsers()).toEqual([{}]);
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it('should create a user', () => {
    expect(
      userController.createUser({ username: 'akshay', password: 'hashpass' }),
    ).toEqual({ id: Date.now(), username: 'akshay', password: 'hashpass' });
    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  it('should return a user by id', () => {
    expect(userController.getUserById(1)).toEqual({
      id: 1,
      username: 'akshay',
      password: 'hashpass',
    });
    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
  });

  it('should delete a user by id', () => {
    expect(userController.deleteUser(1)).toEqual({
      message: `userId:1 deleted successfully`,
    });
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
  });
});
