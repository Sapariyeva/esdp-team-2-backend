import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { RoleFactory } from '../db/factories/role.factory';
import { UserFactory } from '../db/factories/user.factory';
import MainSeeder from '../db/seeds/main.seeds';
import UserSeeder from '../db/seeds/user.seed';
import { Certificate } from '../entities/certificate.entity';
import { City } from '../entities/city.entity';
import { Patient } from '../entities/patient.entity';
import { Photo } from '../entities/photo.entity';
import { Post } from '../entities/post.entity';
import { Psychologist } from '../entities/psychologist.entity';
import { Record } from '../entities/record.entity';
import { Role } from '../entities/role.entity';
import { Symptom } from '../entities/symptom.entity';
import { Technique } from '../entities/technique.entity';
import { TherapyMethod } from '../entities/therapyMethod.entity';
import { User } from '../entities/user.entity';
import { ViewedPsychologists } from '../entities/viewedPsychologists.entity';
import { WorkTime } from '../entities/workTime.entity';
import { env } from '../env';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: env.host || 'mysql',
  port: 3306,
  database: 'psyhelp_online',
  username: 'root',
  password: 'dilnaz1n',
  synchronize: true,
  logging: true,
  entities: [
    Certificate,
    City,
    Patient,
    Photo,
    Post,
    Psychologist,
    Record,
    Role,
    Symptom,
    Technique,
    TherapyMethod,
    User,
    ViewedPsychologists,
    WorkTime,
  ],
  seeds: [MainSeeder, UserSeeder],
  factories: [RoleFactory, UserFactory],
};

export const appDataSource = new DataSource(options);
