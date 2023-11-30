import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
// import { Psychologist } from './psychologist.entity';
// import { Patient } from './patient.entity';
import { IRecord } from '../interfaces/IRecord.interface';

@Entity('records')
export class Record implements IRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  address!: string;

  @Column({ name: 'patient_id' })
  patientId!: number;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @Column({ name: 'city_id' })
  cityId!: number;

  @Column()
  format!: 'online' | 'offline';

  @Column()
  cost!: number;

  @Column({ default: 60 })
  duration!: number;

  @Column({ nullable: true })
  broadcast!: string;

  @Column({ default: false, name: 'is_canceled' })
  isCanceled!: boolean;

  @Column()
  datetime!: string;

  @Column()
  patientName!: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  // @OneToOne(() => Psychologist)
  // @JoinColumn({ name: 'psychologist_id' })
  // psychologist?: Psychologist;

  // @OneToOne(() => Patient)
  // @JoinColumn({ name: 'patient_id' })
  // patient?: Patient;
}
