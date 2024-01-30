import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IWorkTime } from '../interfaces/IWorkTime.interface';
import { Psychologist } from './psychologist.entity';

@Entity('work_time')
export class WorkTime implements IWorkTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column()
  time!: string;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @Column({ default: false })
  available!: boolean;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist!: Psychologist;
}
