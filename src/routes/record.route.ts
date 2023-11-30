import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { RecordController } from '../controllers/record.controller';
import authenticateUser from '../middlewares/authenticateUser';

export class RecordRouter implements IRoute {
  public path = '/records';
  public router = Router();
  private controller: RecordController;

  constructor() {
    this.controller = new RecordController();
    this.init();
  }

  private init() {
    this.router.get('/', authenticateUser, this.controller.getAllRecords);
    this.router.get('/:id', authenticateUser, this.controller.getOneRecord);
    this.router.post('/create', authenticateUser, this.controller.createRecord);
    this.router.post('/:id/cancel', authenticateUser, this.controller.cancelRecord);
  }
}
