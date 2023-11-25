import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ITherapyMethods } from '../interfaces/ITherapyMethods.interface';

@Entity('therapy_methods')
export class TherapyMethod implements ITherapyMethods {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.therapyMethod)
  psychologist?: Psychologist[];
}
