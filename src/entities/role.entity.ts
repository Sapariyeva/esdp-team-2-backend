import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../interfaces/UserRole.enum';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: UserRole;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
