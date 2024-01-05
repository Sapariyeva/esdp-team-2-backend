import { config } from 'dotenv';
import * as process from 'process';
config();

export type IConfig = {
  port: number;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
};

export const env: IConfig = {
  dbHost: process.env.DB_HOST!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  port: parseInt(process.env.PORT!),
};
