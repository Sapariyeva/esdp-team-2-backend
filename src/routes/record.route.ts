import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { RecordController } from '../controllers/record.controller';
import authenticateUser from '../middlewares/authenticateUser';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';

export class RecordRouter implements IRoute {
  public path = '/records';
  public router = Router();
  private controller: RecordController;

  constructor() {
    this.controller = new RecordController();
    this.init();
  }

  private init() {
    this.router.get('/actual', authenticateUser, this.controller.getActualRecords);
    this.router.get('/:id', authenticateUser, this.controller.getOneRecord);
    this.router.post('/create', authenticateUser, this.controller.createRecord);
    this.router.put('/', authenticateUser, this.controller.transferRecord);
    this.router.delete('/:id', authenticateUser, checkUserRole('patient'), this.controller.deleteRecord);
  }
}
