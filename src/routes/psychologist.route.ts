import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { PsychologistController } from '../controllers/psychologist.controller';
import authenticateUser from '../middlewares/authenticateUser';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';

export class PsychologistRouter implements IRoute {
  public path = '/psychologists';
  public router = Router();
  private controller: PsychologistController;

  constructor() {
    this.controller = new PsychologistController();
    this.init();
  }

  private init() {
    this.router.get('/:id', this.controller.getOnePsychologistHandler);
    this.router.get('/getByIds/:ids', this.controller.getPsychologistsByIds);
    this.router.get('/', this.controller.getPsychologistsHandler);
    this.router.put('/edit', authenticateUser, checkUserRole('psychologist'), this.controller.editPsychologistHandler);
    this.router.post('/publish/:id', authenticateUser, checkUserRole('psychologist'), this.controller.publishPsychologistHandler);

    this.router.delete('/:id', authenticateUser, checkUserRole('psychologist'), this.controller.deletePsychologistHandler);

    this.router.post('/filter', this.controller.filterPsychologists);
  }
}
