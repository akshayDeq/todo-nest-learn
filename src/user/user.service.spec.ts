import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../entities/user.entity';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

describe('user service unit tests', () => {
  let service: UserService;
  let userRepo: Repository<Users>;

  const mockUser = {
    username: 'akshaytest',
    password: 'akshaytest',
  };

  const mockUsers = [{ id: 1, ...mockUser }];

  const mockRepo = {
    insert: jest.fn(),
    find: jest.fn(() => {
      return mockUsers;
    }),
    findOne: jest.fn(({ where: { field } }) => {
      switch (field) {
        case 1:
        case 'akshaytest':
          return { ...mockUser };
        default:
          return null;
      }
    }),
    delete: jest.fn(({ id }) => {
      if (id == 1) {
        return { message: 'User deleted successfully' };
      }
      return null;
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
    expect(await service.getUserById(1)).toEqual({ id: 1, ...mockUser });
  });

  it('should get all users in database', async () => {
    expect(await service.getUsers()).toEqual(mockUsers);
  });

  it('should check if user already exists', async () => {
    expect(await service.checkUserAlreadyExists('akshaytest')).toEqual(false);
  });

  it('should insert a new user in database', async () => {
    expect(
      await service.createUser({
        username: 'akshaytest',
        password: 'akshaypass',
      }),
    ).toEqual(new ConflictException({ message: 'User already exists' }));
  });

  it('should delete a user', async () => {
    expect(await service.deleteUser(1)).toEqual({
      message: 'User deleted successfully',
    });
  });
});
