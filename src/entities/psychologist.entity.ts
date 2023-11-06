import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import { User } from './user.entity';
import { Education } from './education.entity copy';

@Entity('psychologist')
export class Psychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: string;

  @Column()
  educationId!: string;

  @Column()
  cityId!: string;

  @Column()
  format!: string;

  @Column()
  cost!: string;

  @Column()
  gender!: string;

  @Column()
  video!: string;

  @Column()
  photo!: string;

  @Column()
  experience!: string;

  @Column()
  description!: string;

  @Column()
  publish!: boolean;

  @OneToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city!: City;

  @OneToMany(() => Education, (education) => education.psychologist)
  educations!: Education[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
