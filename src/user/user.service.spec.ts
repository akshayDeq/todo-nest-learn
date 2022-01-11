import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../entities/user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { Repository } from 'typeorm';

describe('user service unit tests', () => {
  let service: UserService;
  let userRepo: Repository<Users>;

  const mockUser = {
    username: 'akshaytest',
    password: 'akshaytest',
  };

  const mockUsers = [{ id: 1, ...mockUser }];

  const mockRepo = {
    insert: jest.fn(({ username, password }) => {
      return { message: 'User created successfully' };
    }),
    find: jest.fn(() => {
      return mockUsers;
    }),
    findOne: jest.fn(({ where: { field } }) => {
      return { id: 1, ...mockUser };
    }),
    delete: jest.fn(({ id }) => {
      return { message: 'User deleted successfully' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        BcryptService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepo).toBeDefined();
  });

  it('should find a user by id', async () => {
    await expect(service.getUserById(1)).resolves.toEqual({
      id: 1,
      ...mockUser,
    });
  });

  it('should get all users in database', async () => {
    await expect(service.getUsers()).resolves.toEqual(mockUsers);
  });

  it('should check if user already exists', async () => {
    await expect(service.checkUsernameExists('akshaytest')).resolves.toBe(true);
  });

  it('should insert a new user in database', () => {
    expect(
      service.createUser({
        username: 'akshaytest',
        password: 'akshaypass',
      }),
    ).resolves.toEqual({ message: 'User created successfully' });
  });

  it('should delete a user', () => {
    expect(service.deleteUser(1)).resolves.toEqual({
      message: 'User deleted successfully',
    });
  });
});
