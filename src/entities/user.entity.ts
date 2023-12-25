import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from './role.entity';
import { Patient } from './patient.entity';
import { Psychologist } from './psychologist.entity';
import { IUser } from '../interfaces/IUser.interface';
import { UserRole } from '../interfaces/UserRole.enum';

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

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken!: string;

  @Column({ default: false })
  isActivated!: boolean;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles?: Role[];

  @OneToOne(() => Patient, (patient) => patient.user, { cascade: true })
  patient?: Patient;

  @OneToOne(() => Psychologist, (psychologist) => psychologist.user, { cascade: true })
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

  generateRefreshToken(role: UserRole) {
    this.refreshToken = jwt.sign({ id: this.id, role }, config.secretKeyRefresh, { expiresIn: '30d' });
    return this.refreshToken;
  }

  generateAccessToken(role: UserRole) {
    return jwt.sign({ id: this.id, role }, config.secretKey, { expiresIn: '15m' });
  }
}
