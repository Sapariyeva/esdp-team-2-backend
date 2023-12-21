import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AuthController } from '../controllers/auth.controller';
import authenticateUser from '../middlewares/authenticateUser';

export class AuthRouter implements IRoute {
  public path = '/auth';
  public router = Router();
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
    this.init();
  }

  private init() {
    this.router.post('/register', this.controller.signUp);
    this.router.post('/login', this.controller.signIn);
    this.router.post('/logout', this.controller.signOut);
    this.router.get('/refresh-token', this.controller.updateRefreshTokenHandler);
    this.router.get('/activate/:id', this.controller.activateEmail);
    this.router.get('/sendConfirmationLinkToEmail', authenticateUser, this.controller.sendConfirmationLinkToEmail);
    this.router.put('/edit', authenticateUser, this.controller.editUserHandler);
  }
}
