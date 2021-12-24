import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  encryptPassword(saltRounds: number, password: string): Promise<string> {
    return new Promise((resolve) => {
      const hash = bcrypt.hash(password, saltRounds);
      resolve(hash);
    });
  }
}
