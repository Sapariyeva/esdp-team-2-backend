import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import jwt from 'jsonwebtoken';
import config from '../config';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: number;

  @Column({ nullable: true })
  refresh_token!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @BeforeInsert()
  generateRefreshToken() {
    this.refresh_token = jwt.sign({ id: this.user_id }, config.secretKey, { expiresIn: '30d' });
    return this.refresh_token;
  }
  generateAccessToken() {
    return jwt.sign({ id: this.user_id, role: this.user.role }, config.secretKey, { expiresIn: '30m' });
  }
}
