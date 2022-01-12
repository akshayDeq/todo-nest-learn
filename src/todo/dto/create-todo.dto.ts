import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(10)
  readonly todoItem: string;
}
