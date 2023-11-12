import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import jwt from 'jsonwebtoken';
import config from '../config';
import IPsychologistToken from '../interfaces/IPsychologistToken.interface';
import { Psychologist } from './psychologist.entity';

@Entity('psychologist_tokens')
export class PsychologistToken implements IPsychologistToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'refresh_token' })
  refreshToken!: string;

  @Column({ name: 'psychologist_id' })
  psychologistId!: number;

  @OneToOne(() => Psychologist)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist?: Psychologist;

  @BeforeInsert()
  generateRefreshToken() {
    this.refreshToken = jwt.sign({ id: this.psychologistId }, config.secretKey, { expiresIn: '30d' });
    return this.refreshToken;
  }

  generateAccessToken() {
    return jwt.sign({ id: this.psychologistId }, config.secretKey, { expiresIn: '30m' });
  }
}
