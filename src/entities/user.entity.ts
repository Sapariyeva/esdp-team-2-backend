import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, unique: true })
  email!: string;

  @Column({ unique: true, nullable: true })
  phone!: string;

  @Column()
  date_of_birth!: Date;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: 'user' })
  role!: 'user' | 'admin';

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
}
