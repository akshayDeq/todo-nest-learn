import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(10)
  readonly updateTodoItem: string;
}
