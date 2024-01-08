import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';

@Entity('therapy_methods')
export class TherapyMethod implements ITherapyMethod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.therapyMethods, { onDelete: 'CASCADE' })
  psychologists?: Psychologist[];
}
