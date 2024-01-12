import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICity } from '../interfaces/ICity.interface';
import { Psychologist } from './psychologist.entity';

@Entity('cities')
export class City implements ICity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ default: 'Казахстан' })
  country!: string;

  @OneToMany(() => Psychologist, (psychologist) => psychologist.city)
  psychologists?: Psychologist[];
}
