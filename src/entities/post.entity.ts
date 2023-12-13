import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPost } from '../interfaces/IPost.interface';

@Entity('post')
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;
}
