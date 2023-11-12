import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ICity from '../interfaces/ICity.interface';

@Entity('cities')
export class City implements ICity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;
}
