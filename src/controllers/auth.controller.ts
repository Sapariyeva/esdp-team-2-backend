import { AuthService } from '../services/auth.service';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }
}
