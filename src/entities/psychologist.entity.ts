import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { City } from './city.entity';
import { User } from './user.entity';
import { Certificate } from './certificate.entity';
import { TherapyMethod } from './therapyMethod.entity';
import { Techniques } from './techniques.entity';
import { Photo } from './photo.entity';
import { Patient } from './patient.entity';

@Entity('psychologists')
export class Psychologist implements IPsychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column()
  gender!: 'male' | 'female';

  @Column()
  birthDay!: Date;

  @Column({ nullable: true })
  address!: string;

  @Column()
  cost!: number;

  @Column({ length: 600 })
  description!: string;

  @Column({ nullable: true })
  video!: string;

  @Column({ name: 'experience_years' })
  experienceYears!: number;

  @Column()
  languages!: string;

  @Column({ type: 'longtext' })
  education!: string;

  @Column()
  format!: 'online' | 'offline';

  @Column({ name: 'consultation_type' })
  consultationType!: string;

  @Column({ name: 'self_therapy' })
  selfTherapy!: string;

  @Column({ default: false })
  lgbt!: boolean;

  @Column({ name: 'is_publish', default: false })
  isPublish!: boolean;

  @Column({ name: 'city_id' })
  cityId!: number;

  @ManyToMany(() => Techniques, (techniques) => techniques.psychologist, { cascade: true })
  @JoinTable()
  techniques?: Techniques[];

  @ManyToMany(() => TherapyMethod, (therapyMethod) => therapyMethod.psychologist, { cascade: true })
  @JoinTable()
  therapyMethod?: TherapyMethod[];

  @ManyToMany(() => TherapyMethod, (therapyMethod) => therapyMethod.psychologist, { cascade: true })
  @JoinTable()
  symptoms?: TherapyMethod[];

  @ManyToMany(() => TherapyMethod, (therapyMethod) => therapyMethod.psychologist, { cascade: true })
  @JoinTable()
  favorites?: Patient[];

  @ManyToOne(() => Photo, { eager: true })
  @JoinColumn({ name: 'photo_id' })
  photo!: Photo[];

  @OneToOne(() => User, (user) => user.psychologist)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => City, (city) => city.psychologists)
  @JoinColumn({ name: 'city_id' })
  city?: City;

  @OneToMany(() => Certificate, (certificate) => certificate.psychologist, { cascade: true, eager: true })
  certificates?: Certificate[];
}
