import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { SymptomController } from '../controllers/symptom.controller';

export class SymptomRouter implements IRoute {
  public path = '/symptoms';
  router: Router = Router();
  private controller: SymptomController;

  constructor() {
    this.controller = new SymptomController();
    this.init();
  }
  private init() {
    this.router.post('/create', this.controller.createSymptom);
    this.router.delete('/:id', this.controller.deleteSymptom);
    this.router.put('/edit/:id', this.controller.editSymptom);

    this.router.get('/', this.controller.getSymptoms);
    this.router.get('/:id', this.controller.getSymptom);
  }
}
