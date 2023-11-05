import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  username!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ unique: true, nullable: false })
  phone!: string;

  @Column()
  date_of_birth!: Date;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: 'patient' })
  role!: 'admin' | 'patient' | 'psychologist';

  @BeforeInsert()
  async hashPassword() {
    const SALT_WORK_FACTOR = 10;
    if (this.password) {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
  }
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
