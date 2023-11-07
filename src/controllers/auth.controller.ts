import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { SignInUserDto } from '../dto/signInUser.dto';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signIn: RequestHandler = async (req, res) => {
    try {
      const signInUserDto = plainToInstance(SignInUserDto, req.body);
      const user = await this.service.signIn(signInUserDto);
      res.cookie('refresh_token', user.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.send(user);
    } catch (e) {
      console.dir(e);
      return res.status(400).send({ error: { message: (e as Error).message } });
    }
  };
}
