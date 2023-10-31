import App from './app';
import logger from './middlewares/logger';
import { ArticleRoute } from './routes/article.route';

const app = new App({
  port: 8000,
  middlewares: [logger()],
  controllers: [new ArticleRoute()],
});

app.listen();
