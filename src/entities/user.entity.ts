import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}
