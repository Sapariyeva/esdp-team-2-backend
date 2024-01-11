import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import { IRecord } from '../interfaces/IRecord.interface';

@Entity('records')
export class Record implements IRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, type: 'text' })
  address!: string | null;

  @Column({ name: 'patient_id' })
  patientId!: number;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @Column({ name: 'slot_id' })
  slotId!: number;

  @Column({ name: 'psychologist_name' })
  psychologistName!: string;

  @Column({ name: 'city_id' })
  cityId!: number;

  @Column()
  format!: 'online' | 'offline';

  @Column()
  cost!: number;

  @Column({ default: 60 })
  duration!: number;

  @Column({ nullable: true, type: 'text' })
  broadcast!: string | null;

  @Column()
  status!: 'active' | 'canceled' | 'inactive';

  @Column()
  datetime!: string;

  @Column()
  patientName!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @Column({ nullable: true, default: null, name: 'patient_comment' })
  commentPatient!: string;

  @Column({ nullable: true, default: null, name: 'psychologist_comment' })
  commentPsychologist!: string;
}
