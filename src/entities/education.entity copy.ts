import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Psychologist } from './psychologist.entity';

@Entity('educations')
export class Education {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  psychologist_id!: string;

  @Column({ nullable: true })
  university_id!: string;

  @Column()
  specialization!: string;

  @Column()
  graduation_date!: string;

  @Column({ nullable: true })
  certificates!: string;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.educations)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist!: Psychologist;
}
