import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { City } from '../entities/city.entity';
import { Patient } from '../entities/patient.entity';
import { Psychologist } from '../entities/psychologist.entity';
import { Certificate } from '../entities/certificate.entity';
import MainSeeder from '../db/seeds/main.seeds';
import { RoleFactory } from '../db/factories/role.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: '123123dd',
  synchronize: true,
  logging: true,
  entities: [User, Role, City, Patient, Psychologist, Certificate],
  seeds: [MainSeeder],
  factories: [RoleFactory],
};

export const appDataSource = new DataSource(options);
