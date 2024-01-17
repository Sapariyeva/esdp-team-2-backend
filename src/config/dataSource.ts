import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
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
  host: env.host || 'mysql'
  port: 3306,
  database: 'psyhelp_online',
  username: env.dbUser,
  password: env.dbPassword,
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
};

export const appDataSource = new DataSource(options);
