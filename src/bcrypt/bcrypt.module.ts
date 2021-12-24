import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.utility';

@Module({
  providers: [BcryptService],
})
export class BcryptModule {}
