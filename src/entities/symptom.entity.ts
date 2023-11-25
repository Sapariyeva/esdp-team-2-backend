import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ISymptoms } from '../interfaces/ISymptoms.interface';

@Entity('symptoms')
export class Symptom implements ISymptoms {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.symptoms)
  psychologist?: Psychologist[];
}
