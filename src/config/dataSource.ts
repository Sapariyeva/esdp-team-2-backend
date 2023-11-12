import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../db/seeds/main.seeds';
import { UserFactory } from '../db/factories/user.factory';
import { TokenFactory } from '../db/factories/token.factory';
import { Psychologist } from '../entities/psychologist.entity';
import { City } from '../entities/city.entity';
import { Certificate } from '../entities/certificate.entity';
import { Patient } from '../entities/patient.entity';
import { PatientToken } from '../entities/patientToken.entity';
import { PsychologistToken } from '../entities/psychologistToken.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: '123123dd',
  synchronize: true,
  logging: true,
  entities: [Patient, PatientToken, Psychologist, PsychologistToken, City, Certificate],
  seeds: [MainSeeder],
  factories: [UserFactory, TokenFactory],
};

export const appDataSource = new DataSource(options);
