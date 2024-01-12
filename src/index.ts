import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'reflect-metadata';
import App from './app';
import logger from './middlewares/logger.middleware';
import { AuthRouter } from './routes/auth.route';
import initCustomLocals from './middlewares/initCustomLocals.middleware';
import { SymptomRouter } from './routes/symptom.route';
import { CertificateRouter } from './routes/certificate.route';
import { PhotoRouter } from './routes/photo.route';
import { PatientRouter } from './routes/patient.route';
import { PsychologistRouter } from './routes/psychologist.route';
import { RecordRouter } from './routes/record.route';
import { TherapyMethodRouter } from './routes/therapyMethod.route';
import { TechniqueRouter } from './routes/technique.route';
import { CityRouter } from './routes/city.route';
import { PostRouter } from './routes/post.route';
import { WorkTimeRoute } from './routes/workTime.route';
import { env } from './env';
import { ZoomRoute } from './routes/zoom.route';

const app = new App({
  port: env.port,
  middlewares: [initCustomLocals(), logger(), cookieParser(), cors({ credentials: true, origin: env.dbHost })],
  controllers: [
    new PsychologistRouter(),
    new AuthRouter(),
    new SymptomRouter(),
    new TherapyMethodRouter(),
    new PhotoRouter(),
    new PatientRouter(),
    new CertificateRouter(),
    new RecordRouter(),
    new TechniqueRouter(),
    new CityRouter(),
    new PostRouter(),
    new WorkTimeRoute(),
    new ZoomRoute(),
  ],
});

app.listen();
