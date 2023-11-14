import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPatient } from '../interfaces/IPatient.interface';
import { User } from './user.entity';

@Entity('patients')
export class Patient implements IPatient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
