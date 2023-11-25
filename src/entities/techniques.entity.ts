import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ITechniques } from '../interfaces/ITechniques.interface';

@Entity('techniques')
export class Techniques implements ITechniques {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.techniques)
  psychologist?: Psychologist[];
}
