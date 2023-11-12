import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IPatientToken } from '../interfaces/IPatientToken.interface';

@Entity('patient_tokens')
export class PatientToken implements IPatientToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'refresh_token' })
  refreshToken!: string;

  @Column({ name: 'patient_id' })
  patientId!: number;

  @OneToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

  @BeforeInsert()
  generateRefreshToken() {
    this.refreshToken = jwt.sign({ id: this.patientId }, config.secretKey, { expiresIn: '30d' });
    return this.refreshToken;
  }

  generateAccessToken() {
    return jwt.sign({ id: this.patientId }, config.secretKey, { expiresIn: '30m' });
  }
}
