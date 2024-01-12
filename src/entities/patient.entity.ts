import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPatient } from '../interfaces/IPatient.interface';
import { User } from './user.entity';
import { Psychologist } from './psychologist.entity';
import { ViewedPsychologists } from './viewedPsychologists.entity';

@Entity('patients')
export class Patient implements IPatient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToMany(() => Psychologist, { cascade: true })
  @JoinTable()
  favorites?: Psychologist[];

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => ViewedPsychologists, (viewedPsychologist) => viewedPsychologist.patient, { cascade: true, eager: true })
  lastViewedPsychologists?: ViewedPsychologists[];
}
