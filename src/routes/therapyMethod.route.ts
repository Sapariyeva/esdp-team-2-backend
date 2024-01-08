import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { TherapyMethodController } from '../controllers/therapyMethod.controller';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';
import authenticateUser from '../middlewares/authenticateUser';

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
    this.router.post('/create', authenticateUser, checkUserRole('admin'), this.controller.createTherapyMethod);
    this.router.put('/edit/:id', authenticateUser, checkUserRole('admin'), this.controller.updateOneTherapyMethod);
    this.router.delete('/:id', authenticateUser, checkUserRole('admin'), this.controller.deleteOneTherapyMethod);
  }
}
