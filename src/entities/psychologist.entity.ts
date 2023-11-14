import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { User } from './user.entity';

@Entity('psychologists')
export class Psychologist implements IPsychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  format!: 'online' | 'offline';

  @Column()
  cost!: number;

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

  @Column({ name: 'user_id' })
  userId!: number;

  @OneToOne(() => User, (user) => user.psychologist)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
