import { IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  readonly todoItem: string;
}
