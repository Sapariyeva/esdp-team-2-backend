import 'reflect-metadata';
import App from './app';
import logger from './middlewares/logger';
import { ArticleRoute } from './routes/article.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors(), cookieParser()],
  controllers: [new ArticleRoute()],
});

app.listen();
