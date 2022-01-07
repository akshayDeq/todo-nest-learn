import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../utilities/bcrypt/bcrypt.utility';
import { Users } from '../entities/user.entity';
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
  async getUsers(): Promise<Users[] | HttpException> {
    try {
      const users = await this.userRepository.find();
      // return not found exception if users table is empty
      if (!users.length) {
        return new NotFoundException('No users in database');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // get a user entry by ID from database
  async getUserById(id: number): Promise<Users | HttpException> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      // return not found exception if users id does not exists
      if (!user) {
        return new NotFoundException('User does not exist');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // insert a new user into database
  async createUser({ username, password }: CreateUserDto): Promise<any> {
    try {
      // call the checkUserAlreadyExists function
      const checkIfUserExists = await this.checkUserAlreadyExists(username);

      // create a new user if it does not exists
      if (!checkIfUserExists) {
        // hash the user entered password using the bcrypt service
        const hashedPassword = await this.bcryptService.encryptPassword(
          1,
          password,
        );
        // save the username & hashed password in users table
        await this.userRepository.insert({
          username,
          password: hashedPassword,
        });
        return { message: 'User created successfully' };
      }
      return new ConflictException({ message: 'User already exists' });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // delete a user from database
  async deleteUser(id: number): Promise<any> {
    try {
      // check if the user with given id exists
      const user = await this.userRepository.findOne({ where: { id } });
      // if the user does not exists return a not found exception
      if (!user) {
        return new BadRequestException({ message: 'User does not exist' });
      }
      await this.userRepository.delete({ id });
      return { message: `User deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // function to check if user already exists in database
  async checkUserAlreadyExists(username: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
