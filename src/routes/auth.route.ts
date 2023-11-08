import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { AuthController } from '../controllers/auth.controller';
import { validateRefreshToken } from '../middlewares/validateRefreshToken.middleware';

export class AuthRouter implements IRoute {
  public path = '/auth';
  public router = Router();
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
    this.init();
  }

  private init() {
    this.router.post('/sessions', this.controller.signIn);
    this.router.post('/register', this.controller.signUp);
    this.router.get('/refresh', validateRefreshToken, this.controller.refresh);
  }
}
