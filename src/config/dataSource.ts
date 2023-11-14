import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Psychologist } from '../entities/psychologist.entity';
import { City } from '../entities/city.entity';
import { Certificate } from '../entities/certificate.entity';
import { Patient } from '../entities/patient.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: '123123',
  synchronize: true,
  logging: true,
  entities: [User, Role, Patient, Psychologist, City, Certificate],
  seeds: [],
  factories: [],
};

export const appDataSource = new DataSource(options);
