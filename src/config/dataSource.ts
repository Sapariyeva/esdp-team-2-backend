import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../db/seeds/main.seeds';
import { RoleFactory } from '../db/factories/role.factory';
import SymptomsSeeder from '../db/seeds/symptoms.seeds';
import { SymptomsFactory } from '../db/factories/symptoms.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: '123123',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  seeds: [MainSeeder, SymptomsSeeder],
  factories: [RoleFactory, SymptomsFactory],
};

export const appDataSource = new DataSource(options);
