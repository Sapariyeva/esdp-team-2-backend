import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPhoto } from '../interfaces/IPhoto.interface';
import { Psychologist } from './psychologist.entity';

@Entity('photos')
export class Photo implements IPhoto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  photo!: string;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @OneToOne(() => Psychologist, (psychologist) => psychologist.photo)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;
}
