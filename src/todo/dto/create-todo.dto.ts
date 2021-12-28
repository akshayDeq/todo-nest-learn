import { IsArray, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsArray()
  @MaxLength(5, {
    each: true,
  })
  readonly title: string;
}
