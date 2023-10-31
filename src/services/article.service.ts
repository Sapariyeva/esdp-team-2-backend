import { IArticle } from '../interfaces/IArticle.interface';

export class ArticleService {
  private articles: IArticle[] = [];

  getAllArticles = (): IArticle[] => {
    return this.articles;
  };

  getArticle = (id: string): IArticle => {
    const article = this.articles.find((article) => article.id === id);
    if (article) return article;
    else throw new Error('invalid id');
  };

  createArticle = (data: IArticle): IArticle => {
    return {
      id: Math.random().toString(),
      title: data.title,
      description: data.description,
    };
  };
}
