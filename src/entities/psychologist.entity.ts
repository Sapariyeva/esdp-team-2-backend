import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { City } from './city.entity';
import { User } from './user.entity';
import { Certificate } from './certificate.entity';

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

  @Column({ nullable: true })
  video!: string;

  @Column()
  photo!: string;

  @Column({ name: 'experience_years' })
  experienceYears!: number;

  @Column()
  description!: string;

  @Column({ type: 'longtext' })
  education!: string;

  @Column({ name: 'is_publish', default: false })
  isPublish!: boolean;

  @Column({ name: 'city_id' })
  cityId!: number;

  @ManyToOne(() => City, { eager: true })
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @Column({ name: 'user_id' })
  userId!: number;

  @OneToOne(() => User, (user) => user.psychologist)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => Certificate, (certificate) => certificate.psychologist, { cascade: true, eager: true })
  certificates?: Certificate[];
}
