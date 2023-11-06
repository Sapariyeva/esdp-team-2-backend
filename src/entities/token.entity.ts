import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import jwt from 'jsonwebtoken';
import config from '../config';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: string;

  @Column({ nullable: true })
  refresh_token!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @BeforeInsert()
  generateRefreshToken() {
    this.refresh_token = jwt.sign({ id: this.id }, config.secretKey, { expiresIn: '7d' });
    return this.refresh_token;
  }
}
