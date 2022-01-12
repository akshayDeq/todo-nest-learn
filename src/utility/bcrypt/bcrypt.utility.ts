import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  // function to encrypt user password before saving to database
  encryptPassword(saltRounds: number, password: string): Promise<string> {
    return new Promise((resolve) => {
      const hash = bcrypt.hash(password, saltRounds);
      resolve(hash);
    });
  }

  // function to decrypt user password for authorization
  decryptPassword(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve) => {
      const isMatch = bcrypt.compare(password, hashedPassword);
      resolve(isMatch);
    });
  }
}
