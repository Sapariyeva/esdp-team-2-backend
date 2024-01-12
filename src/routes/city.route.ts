import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { CityController } from '../controllers/city.controller';

export class CityRouter implements IRoute {
  public path = '/cities';
  router: Router = Router();
  private controller: CityController;

  constructor() {
    this.controller = new CityController();
    this.init();
  }
  private init() {
    this.router.get('/', this.controller.getAllCity);
  }
}
