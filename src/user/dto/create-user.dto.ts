import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 15)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @Length(8, 15)
  @IsNotEmpty()
  readonly password: string;
}
