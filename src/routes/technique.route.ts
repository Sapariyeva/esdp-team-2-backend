import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { TechniqueController } from '../controllers/technique.controller';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';
import authenticateUser from '../middlewares/authenticateUser';

export class TechniqueRouter implements IRoute {
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
    this.router.post('/create', authenticateUser, checkUserRole('admin'), this.controller.createTechnique);
    this.router.put('/edit/:id', authenticateUser, checkUserRole('admin'), this.controller.updateOneTechnique);
    this.router.delete('/:id', authenticateUser, checkUserRole('admin'), this.controller.deleteOneTechnique);
  }
}
