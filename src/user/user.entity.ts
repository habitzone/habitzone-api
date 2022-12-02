import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 36 })
  username: string;

  @Column('char', { length: 60 })
  password: string;

  //   @Column({ default: true })
  //   isActive: boolean;
}
