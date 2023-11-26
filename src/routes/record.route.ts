import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { RecordController } from '../controllers/record.controller';

export class TherapyMethodRouter implements IRoute {
  public path = '/records';
  public router = Router();
  private controller: RecordController;

  constructor() {
    this.controller = new RecordController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAllRecords);
    this.router.get('/:id', this.controller.getOneRecord);
    this.router.post('/create', this.controller.createRecord);
    this.router.put('/:id/cancel', this.controller.CancelRecord);
  }
}
