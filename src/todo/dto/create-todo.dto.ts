import { IsInt, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsInt()
  readonly id: number;

  @MaxLength(5, {
    each: true,
  })
  readonly title: string[];
}
