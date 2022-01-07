import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';

describe('user service unit tests', () => {
  let spyService: UserService;
  let userRepository: Repository<Users>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        BcryptService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    spyService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
