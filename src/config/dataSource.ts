import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { Token } from '../entities/token.entity';
import MainSeeder from '../db/seeds/main.seeds';
import { UserFactory } from '../db/factories/user.factory';
import { TokenFactory } from '../db/factories/token.factory';
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
  password: 'root',
  synchronize: true,
  logging: true,
  entities: [User, Token, Psychologist, Universities, City, Education],
  seeds: [MainSeeder],
  factories: [UserFactory, TokenFactory],
};

export const appDataSource = new DataSource(options);
