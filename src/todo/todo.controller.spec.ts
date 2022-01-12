import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthService } from '../auth/auth.service';
import { Users } from '../entities/user.entity';
import { BcryptService } from '../utility/bcrypt/bcrypt.utility';
import { JwtModule } from '@nestjs/jwt';

describe('TodoController', () => {
  let todoController: TodoController;
  let spyService: TodoService;
  let todoRepository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        BcryptService,
        AuthService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
      imports: [JwtModule.register({ secret: 'mockpass' })],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    spyService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
