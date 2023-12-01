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

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: '123trionix321',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  seeds: [MainSeeder, SymptomsSeeder, TherapyMethodSeeder, TechniqueSeeder],
  factories: [RoleFactory, SymptomsFactory, TherapyMethodFactory, TechniqueFactory],
};

export const appDataSource = new DataSource(options);
