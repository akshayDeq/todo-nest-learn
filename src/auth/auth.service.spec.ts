import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../utility/bcrypt/bcrypt.utility';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
