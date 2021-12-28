import { ArrayNotEmpty, IsArray, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsArray()
  @ArrayNotEmpty()
  @MinLength(10, {
    each: true,
  })
  @MaxLength(50, {
    each: true,
  })
  readonly todoItems: string;
}
