import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../interfaces/UserRole.enum';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser.interface';
import { Role } from './role.entity';
import { Patient } from './patient.entity';
import { Psychologist } from './psychologist.entity';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, unique: true })
  username!: string;

  @Column({ nullable: true, unique: true })
  email!: string;

  @Column({ nullable: true, unique: true })
  phone!: string;

  @Column()
  password!: string;

  @Column({ name: 'refresh_token' })
  refreshToken!: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true, eager: true })
  @JoinTable()
  roles?: UserRole[];

  @OneToOne(() => Patient, (patient) => patient.user)
  patient?: Patient;

  @OneToOne(() => Psychologist, (psychologist) => psychologist.user)
  psychologist?: Psychologist;

  @BeforeInsert()
  async hashPassword() {
    const SALT_WORK_FACTOR = 10;
    if (this.password) {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  generateRefreshToken() {
    this.refreshToken = jwt.sign({ id: this.id }, config.secretKey, { expiresIn: '1m' });
    return this.refreshToken;
  }

  generateAccessToken() {
    return jwt.sign({ id: this.id }, config.secretKey, { expiresIn: '15s' });
  }
}
