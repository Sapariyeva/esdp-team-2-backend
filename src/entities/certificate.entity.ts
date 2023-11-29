import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICertificate } from '../interfaces/ICertificate.interface';
import { Psychologist } from './psychologist.entity';

@Entity('certificates')
export class Certificate implements ICertificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  certificate!: string;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @ManyToOne(() => Psychologist)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;
}
