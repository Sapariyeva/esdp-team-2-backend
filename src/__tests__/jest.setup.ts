import { DataSource } from 'typeorm';
import { options } from '../config/dataSource';

const dataSource = new DataSource(options);

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});
global.__DATASOURCE__ = dataSource;
