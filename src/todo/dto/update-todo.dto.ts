import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly todoItem: string;
}
