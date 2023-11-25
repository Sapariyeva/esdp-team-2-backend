import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from '../db/seeds/main.seeds';
import { RoleFactory } from '../db/factories/role.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: 'Nailchik1n',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*.ts'],
  seeds: [MainSeeder],
  factories: [RoleFactory],
};

export const appDataSource = new DataSource(options);
