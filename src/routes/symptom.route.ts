import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { SymptomController } from '../controllers/symptom.controller';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';
import authenticateUser from '../middlewares/authenticateUser';

export class SymptomRouter implements IRoute {
  public path = '/symptoms';
  router: Router = Router();
  private controller: SymptomController;

  constructor() {
    this.controller = new SymptomController();
    this.init();
  }
  private init() {
    this.router.post('/create', authenticateUser, checkUserRole('admin'), this.controller.createSymptom);
    this.router.delete('/:id', authenticateUser, checkUserRole('admin'), this.controller.deleteSymptom);
    this.router.put('/edit/:id', authenticateUser, checkUserRole('admin'), this.controller.editSymptom);

    this.router.get('/', this.controller.getSymptoms);
    this.router.get('/:id', this.controller.getSymptom);
  }
}
