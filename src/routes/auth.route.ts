import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AuthController } from '../controllers/auth.controller';
import authenticateUser from '../middlewares/authenticateUser';
import { upload } from '../middlewares/ValidateUpload.middlewar';

export class AuthRouter implements IRoute {
  public path = '/auth';
  public router = Router();
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
    this.init();
  }

  private init() {
    this.router.post('/register/patient', this.controller.registerPatientHandler);
    this.router.post(
      '/register/psychologist',
      upload.fields([{ name: 'photos' }, { name: 'certificates' }]),
      this.controller.registerPsychologistHandler,
    );
    this.router.post('/login', this.controller.loginUserHandler);
    this.router.post('/admin', this.controller.loginAdminHandler);
    this.router.post('/logout', this.controller.logoutUserHandler);
    this.router.get('/refresh-token', this.controller.updateRefreshTokenHandler);
    this.router.get('/activate/:id', this.controller.activateEmail);
    this.router.get('/sendConfirmationLinkToEmail', authenticateUser, this.controller.sendConfirmationLinkToEmail);
    this.router.put('/edit', authenticateUser, this.controller.editUserHandler);
  }
}
