import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ISymptom } from '../interfaces/ISymptom.interface';

@Entity('symptoms')
export class Symptom implements ISymptom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.symptoms, { onDelete: 'CASCADE' })
  psychologists?: Psychologist[];
}
