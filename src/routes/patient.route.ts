import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { PatientController } from '../controllers/patient.controller';

export class PatientRouter implements IRoute {
  public path = '/patients';
  router: Router = Router();
  private controller: PatientController;

  constructor() {
    this.controller = new PatientController();
    this.init();
  }
  private init() {
    this.router.post('/create', this.controller.createPatient);
    this.router.delete('/:id', this.controller.deletePatient);
    this.router.put('/edit/:id', this.controller.editPatient);
    this.router.post('/:id/favorites', this.controller.addToFavorites);

    this.router.get('/', this.controller.getPatients);
    this.router.get('/:id', this.controller.getPatient);
  }
}
