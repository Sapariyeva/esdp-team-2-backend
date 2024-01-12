import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { PatientFactory } from '../db/factories/patient.factory';
import { PostFactory } from '../db/factories/post.factory';
import { PsychologistFactory } from '../db/factories/psychologist.factory';
import { RoleFactory } from '../db/factories/role.factory';
import { SymptomsFactory } from '../db/factories/symptoms.factory';
import { TechniqueFactory } from '../db/factories/technique.factory';
import { TherapyMethodFactory } from '../db/factories/therapyMethod.factory';
import { UserFactory } from '../db/factories/user.factory';
import MainSeeder from '../db/seeds/main.seeds';
import PatientSeeder from '../db/seeds/patient.seeds';
import PostSeeder from '../db/seeds/post.seeds';
import PsychologistSeeder from '../db/seeds/psychologist.seeds';
import SymptomsSeeder from '../db/seeds/symptoms.seeds';
import TechniqueSeeder from '../db/seeds/technique.seeds';
import TherapyMethodSeeder from '../db/seeds/therapyMethod.seeds';
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
  host: 'mysql',
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
  seeds: [MainSeeder, SymptomsSeeder, TherapyMethodSeeder, TechniqueSeeder, UserSeeder, PsychologistSeeder, PatientSeeder, PostSeeder],
  factories: [RoleFactory, SymptomsFactory, TherapyMethodFactory, TechniqueFactory, UserFactory, PsychologistFactory, PatientFactory, PostFactory],
};

export const appDataSource = new DataSource(options);
