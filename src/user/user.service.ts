import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/utilities/bcrypt/bcrypt.utility';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly bcryptService: BcryptService,
  ) {}

  // get all user entries from database
  async getUsers(): Promise<Users[]> {
    try {
      const users = await this.userRepository.find();
      if (!users) {
        throw new HttpException('No users in database', 404);
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // get a user entry by ID from database
  async getUserById(id: number): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User does not exist', 404);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException({
        description: `No user with id:${id} exists`,
      });
    }
  }

  // insert a new user into database
  async createUser({ username, password }: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await this.bcryptService.encryptPassword(
        1,
        password,
      );
      await this.userRepository.insert({
        username,
        password: hashedPassword,
      });
      return { description: 'User created successfully' };
    } catch (error) {
      throw new ConflictException({ description: 'Username already exists' });
    }
  }

  // delete a user from database
  async deleteUser(id: number): Promise<any> {
    try {
      await this.userRepository.delete({ id });
      return { description: `User deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
