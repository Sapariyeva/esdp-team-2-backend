import { RequestHandler } from 'express';
import { ArticleService } from '../services/article.service';

export class ArticleController {
  private service: ArticleService;

  constructor() {
    this.service = new ArticleService();
  }

  getAllArticles: RequestHandler = (req, res): void => {
    const articles = this.service.getAllArticles;
    res.send(articles);
  };

  getArticle: RequestHandler = (req, res): void => {
    const article = this.service.getArticle(req.params.id);
    res.send(article);
  };

  createArticle: RequestHandler = (req, res): void => {
    const article = this.service.createArticle(req.body);
    res.send(article);
  };
}
