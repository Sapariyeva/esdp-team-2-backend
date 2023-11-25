import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPhoto } from '../interfaces/IPhoto.interface';

@Entity('photos')
export class Photo implements IPhoto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  photo!: string;

  @Column()
  psychologistId!: number;
}
