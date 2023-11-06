import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';
import { Psychologist } from '../entities/psychologist.entity';
import { Universities } from '../entities/universities.entity';
import { City } from '../entities/city.entity';
import { Education } from '../entities/education.entity copy';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: 'password',
  synchronize: true,
  logging: true,
  entities: [User, Token, Psychologist, Universities, City, Education],
  seeds: [],
  factories: [],
};

export const appDataSource = new DataSource(options);
