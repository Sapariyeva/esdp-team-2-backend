import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { WorkTimeController } from '../controllers/workTime.controller';
import authenticateUser from '../middlewares/authenticateUser';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';

export class WorkTimeRoute implements IRoute {
  public path = '/appointments';
  router: Router = Router();
  private controller: WorkTimeController;

  constructor() {
    this.controller = new WorkTimeController();
    this.init();
  }
  private init() {
    this.router.get('/', authenticateUser, checkUserRole('psychologist'), this.controller.getAllWorkTime);
    this.router.get('/:id', checkUserRole('patient'), this.controller.getFreeWorkTime);
    this.router.post('/', authenticateUser, checkUserRole('psychologist'), this.controller.createScheduleItem);
    this.router.delete('/:id', authenticateUser, checkUserRole('psychologist'), this.controller.deleteTime);
  }
}
