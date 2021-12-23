import { IsInt } from 'class-validator';

export class CreateTodoDto {
  @IsInt()
  readonly id: number;

  readonly title: string[];
}
