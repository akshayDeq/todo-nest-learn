import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  password: string;
}
