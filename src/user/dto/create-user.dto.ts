import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 15)
  readonly username: string;

  @IsString()
  @Length(8, 15)
  readonly password: string;
}
