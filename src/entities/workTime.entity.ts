import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';
import { IWorkTime } from '../interfaces/IWorkTime.interface';

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

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.certificates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;
}
