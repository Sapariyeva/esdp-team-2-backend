import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICertificate } from '../interfaces/ICertificate.interface';
import { Psychologist } from './psychologist.entity';

@Entity('certificates')
export class Certificate implements ICertificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sertificate!: string;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.certificates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;
}
