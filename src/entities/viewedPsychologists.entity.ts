import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { Psychologist } from './psychologist.entity';
import { IViewedPsychologist } from '../interfaces/IViewedPsychologist';

@Entity('last_viewed_psychologists')
export class ViewedPsychologists implements IViewedPsychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'patient_id' })
  patientId!: number;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt!: Date;

  @ManyToOne(() => Patient, (patient) => patient.lastViewedPsychologists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

  @ManyToOne(() => Psychologist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;
}
