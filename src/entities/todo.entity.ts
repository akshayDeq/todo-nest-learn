import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  todoItem: string;

  @Column({ nullable: false })
  user_id: number;
}
