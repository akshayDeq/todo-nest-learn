import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/utilities/bcrypt/bcrypt.utility';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userCredentials: Users): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        username: userCredentials.username,
      });
      const isMatch = await this.bcryptService.decryptPassword(
        userCredentials.password,
        user.password,
      );
      if (user && isMatch) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {}
    throw new InternalServerErrorException();
  }

  async login(user: Users) {
    try {
      const userValidation = await this.validateUser(user);
      if (!userValidation) {
        throw new BadRequestException();
      }
      const jwtPayload = {
        username: userValidation.username,
        password: userValidation.password,
      };
      const accessToken = this.jwtService.sign(jwtPayload, {
        expiresIn: 3600,
      });
      return {
        expires_in: 3600,
        access_token: accessToken,
        username: jwtPayload.username,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateJWT(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
