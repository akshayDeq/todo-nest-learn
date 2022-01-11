import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../entities/user.entity';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { UserStub } from './user.stub';

describe('user controller unit tests', () => {
  let userController: UserController;
  let spyService: UserService;
  const userStub = new UserStub();

  const mockUserService = {
    getUsers: jest.fn(() => {
      return userStub.getUsers();
    }),
    createUser: jest.fn(({ username, password }) => {
      return userStub.createUser({ username, password });
    }),
    getUserById: jest.fn((id) => {
      return userStub.getUserById(id);
    }),
    deleteUser: jest.fn((id) => {
      if (id == 1) return userStub.deleteUser(id);
      return { message: `UserId:${id} does not exists` };
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
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(spyService).toBeDefined();
  });

  it('should return all users', () => {
    expect(userController.getUsers()).toEqual(userStub.getUsers());
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it('should create a user', () => {
    expect(
      userController.createUser({ username: 'akshay', password: 'hashpass' }),
    ).toEqual(
      userStub.createUser({ username: 'akshay', password: 'hashpass' }),
    );
    expect(mockUserService.createUser).toHaveBeenCalled();
  });

  it('should return a user by id', () => {
    expect(userController.getUserById(1)).toEqual(userStub.getUserById(1));
    expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
  });

  it('should delete a user by id', () => {
    expect(userController.deleteUser(1)).toEqual({
      message: `userId:1 deleted successfully`,
    });
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
  });
});
