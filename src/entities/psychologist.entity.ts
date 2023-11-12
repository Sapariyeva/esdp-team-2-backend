import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import IPsychologist from '../interfaces/IPsychologist.interface';

@Entity('psychologists')
export class Psychologist implements IPsychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, unique: true })
  email!: string;

  @Column({ nullable: true, unique: true })
  phone!: string;

  @Column({ default: 'psychologist' })
  role!: 'psychologist' | 'psychologist-admin';

  @Column()
  password!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  format!: 'online' | 'offline';

  @Column()
  cost!: number;

  @Column()
  educationId!: string;

  @Column()
  gender!: 'male' | 'female';

  @Column()
  video!: string;

  @Column()
  photo!: string;

  @Column({ name: 'experience_years' })
  experienceYears!: number;

  @Column()
  description!: string;

  @Column({ type: 'longtext' })
  education!: string;

  @Column({ name: 'is_publish' })
  isPublish!: boolean;

  @Column({ name: 'city_id' })
  cityId!: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city?: City;
}
