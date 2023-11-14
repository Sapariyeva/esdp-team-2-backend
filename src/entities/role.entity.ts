import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IRole } from '../interfaces/IRole.interface';
import { UserRole } from '../interfaces/UserRole.enum';
import { User } from './user.entity';

@Entity('roles')
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: UserRole;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
