import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('psychologist')
export class Psychologist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: string;

  @Column()
  education!: string;

  @Column()
  city!: string;

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
}
