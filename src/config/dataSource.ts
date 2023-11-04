import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: 'Nailchik1n',
  synchronize: false,
  logging: true,
  entities: ['src/entities/*.ts'],
  seeds: [],
  factories: ['src/db/factories/*.ts'],
};

export const appDataSource = new DataSource(options);
