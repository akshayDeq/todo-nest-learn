import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/bcrypt/bcrypt.utility';
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

  async getUserById(id: number): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('User does not exist', 404);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createUser({ username, password }: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await this.bcryptService.encryptPassword(
        1,
        password,
      );
      console.log(hashedPassword);
      const user = await this.userRepository.insert({
        username,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new ConflictException({ description: 'Username already exists' });
    }
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const user = await this.userRepository.delete({ id });
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
