import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { ITechnique } from '../interfaces/ITechnique.interface';

@Entity('techniques')
export class Technique implements ITechnique {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Psychologist, (psychologist) => psychologist.techniques, { onDelete: 'CASCADE' })
  psychologists?: Psychologist[];
}
