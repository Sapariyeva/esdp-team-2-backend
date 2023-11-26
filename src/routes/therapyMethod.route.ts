import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { TherapyMethodController } from '../controllers/therapyMethod.controller';

export class TherapyMethodRouter implements IRoute {
  public path = '/methods';
  public router = Router();
  private controller: TherapyMethodController;

  constructor() {
    this.controller = new TherapyMethodController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllTherapyMethod);
    this.router.get('/:id', this.controller.getOneTherapyMethod);
    this.router.post('/create', this.controller.createTherapyMethod);
    this.router.put('/edit/:id', this.controller.updateOneTherapyMethod);
  }
}
