import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { PatientController } from '../controllers/patient.controller';
import authenticateUser from '../middlewares/authenticateUser';

export class PatientRouter implements IRoute {
  public path = '/patients';
  router: Router = Router();
  private controller: PatientController;

  constructor() {
    this.controller = new PatientController();
    this.init();
  }
  private init() {
    this.router.delete('/:id', this.controller.deletePatient);
    this.router.put('/edit/:id', authenticateUser, this.controller.editPatient);
    this.router.post('/favorites', authenticateUser, this.controller.changeToFavorites);
    this.router.post('/viewedPsychologists/:id', this.controller.updateLastPsychologists);
    this.router.get('/viewedPsychologists', this.controller.getVeiewedPsychologists);
    this.router.get('/', this.controller.getPatients);
    this.router.get('/:id', this.controller.getPatient);
  }
}
