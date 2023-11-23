import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { IRoute } from '../interfaces/IRoute.interface';

export class ArticleRoute implements IRoute {
  public path = '/articles';
  public router = Router();
  private controller: ArticleController;

  constructor() {
    this.controller = new ArticleController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllArticles);
    this.router.get('/:id', this.controller.getArticle);
    this.router.post('/', this.controller.createArticle);
  }
}
