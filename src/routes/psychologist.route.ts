import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { PsychologistController } from '../controllers/psychologist.controller';
import { upload } from '../middlewares/ValidateUpload.middlewar';
import authenticateUser from '../middlewares/authenticateUser';

export class PsychologistRouter implements IRoute {
  public path = '/psychologists';
  public router = Router();
  private controller: PsychologistController;

  constructor() {
    this.controller = new PsychologistController();
    this.init();
  }

  private init() {
    this.router.post(
      '/create',
      authenticateUser,
      upload.fields([{ name: 'photos' }, { name: 'certificates' }]),
      this.controller.createPsychologistHandler,
    );
    this.router.get('/:id', this.controller.getOnePsychologistHandler);
    this.router.get('/', this.controller.getPsychologistsHandler);
    this.router.post('/', this.controller.getPsychologistsHandler);
    this.router.post('/:id/publish', this.controller.publishPsychologistHandler);
    this.router.delete('/:id', this.controller.deletePsychologistHandler);
    this.router.put('/edit/:id', this.controller.editPsychologistHandler);
  }
}
