import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../db/seeds/main.seeds';
import { RoleFactory } from '../db/factories/role.factory';
import SymptomsSeeder from '../db/seeds/symptoms.seeds';
import { SymptomsFactory } from '../db/factories/symptoms.factory';
import TherapyMethodSeeder from '../db/seeds/therapyMethod.seeds';
import { TherapyMethodFactory } from '../db/factories/therapyMethod.factory';
import TechniqueSeeder from '../db/seeds/technique.seeds';
import { TechniqueFactory } from '../db/factories/technique.factory';
import UserSeeder from '../db/seeds/user.seed';
import { UserFactory } from '../db/factories/user.factory';
import { PatientFactory } from '../db/factories/patient.factory';
import PatientSeeder from '../db/seeds/patient.seeds';
import PsychologistSeeder from '../db/seeds/psychologist.seeds';
import { PsychologistFactory } from '../db/factories/psychologist.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: 'admin',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  seeds: [MainSeeder, SymptomsSeeder, TherapyMethodSeeder, TechniqueSeeder, UserSeeder, PsychologistSeeder, PatientSeeder],
  factories: [RoleFactory, SymptomsFactory, TherapyMethodFactory, TechniqueFactory, UserFactory, PsychologistFactory, PatientFactory],
};

export const appDataSource = new DataSource(options);
