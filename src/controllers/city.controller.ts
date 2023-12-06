import { RequestHandler } from 'express';
import { CityService } from '../services/city.service';

export class CityController {
  private service: CityService;

  constructor() {
    this.service = new CityService();
  }

  getAllCity: RequestHandler = async (req, res, next) => {
    try {
      res.send(await this.service.getAllPhoto());
    } catch (e) {
      next(e);
    }
  };
}
