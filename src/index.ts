import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import App from './app';
import logger from './middlewares/logger.middleware';
import { AuthRouter } from './routes/auth.route';
import initCustomLocals from './middlewares/initCustomLocals.middleware';
import { SymptomRouter } from './routes/symptom.route';

const app = new App({
  port: 8000,
  middlewares: [initCustomLocals(), logger(), cookieParser(), cors()],
  controllers: [new AuthRouter(), new SymptomRouter()],
});

app.listen();
