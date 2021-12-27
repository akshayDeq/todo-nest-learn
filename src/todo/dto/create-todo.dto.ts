import { MaxLength } from 'class-validator';

export class CreateTodoDto {
  @MaxLength(5, {
    each: true,
  })
  readonly title: string;
}
