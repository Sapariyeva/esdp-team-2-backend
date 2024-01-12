import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPost } from '../interfaces/IPost.interface';

@Entity('post')
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'longtext' })
  description!: string;

  @Column()
  image?: string;

  @Column({ default: false })
  isPublish?: boolean;
}
