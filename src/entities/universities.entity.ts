import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('universities')
export class Universities {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  name!: string;
}
