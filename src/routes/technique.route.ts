import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { TechniqueController } from '../controllers/technique.controller';

export class TherapyMethodRouter implements IRoute {
  public path = '/techniques';
  public router = Router();
  private controller: TechniqueController;

  constructor() {
    this.controller = new TechniqueController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllTechnique);
    this.router.get('/:id', this.controller.getOneTechnique);
    this.router.post('/create', this.controller.createTechnique);
    this.router.put('/edit/:id', this.controller.updateOneTechnique);
    this.router.delete('/:id', this.controller.deleteOneTechnique);
  }
}
