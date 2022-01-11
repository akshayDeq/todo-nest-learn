import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserStub {
  getUsers(): Users[] {
    return [{ id: 1, username: 'akshay', password: 'hashpass' }];
  }
  createUser({ username, password }: CreateUserDto): Users {
    return {
      id: Date.now(),
      username,
      password,
    };
  }
  getUserById(id: number): Users {
    return { id, username: 'akshay', password: 'hashpass' };
  }
  deleteUser(id: number): any {
    return { message: `userId:${id} deleted successfully` };
  }
}
