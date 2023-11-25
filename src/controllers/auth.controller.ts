import { RequestHandler, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { AuthUserDto } from '../dto/authUser.dto';
import { ApiError } from '../helpers/api-error';
import { validate } from 'class-validator';
import { formatErrors } from '../helpers/formatErrors';
import { IUser } from '../interfaces/IUser.interface';
import { UserDto } from '../dto/user.dto';
import mailer from '../email/nodemailer';
import { EmailMessage } from '../interfaces/email/IEmailMessage';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signUp: RequestHandler = async (req, res, next) => {
    try {
      const userDto = plainToInstance(AuthUserDto, req.body);
      await this.validateDto(userDto);

      const userData = await this.service.signUp(userDto);
      if (!userData) throw ApiError.BadRequest('s');

      this.setRefreshTokenCookie(res, userData.refreshToken);
      const user = this.mapUserDataToUserDto(userData);
      const message = {
        to: req.body.email,
        subject: 'Подтверждение почты',
        html: `<h2>Вы зарегистрировались</h2>
        <i>Ваши данные:</i>
        <ul>
          <li>login: ${req.body.email}</li>
          <li>password: ${req.body.password}</li>
        </ul>

        <a href="http://localhost:8000/activate/">Подтвердить почту</a>
        `,
      } as unknown as EmailMessage;
      const isActivated = req.query.isActivated === 'true';
      if (isActivated) {
        const refreshToken = req.cookies.refreshToken;
        this.service.signIn(refreshToken);
      }
      mailer(message);
      res.send(user);
    } catch (e) {
      next(e);
    }
  };
  signIn: RequestHandler = async (req, res, next) => {
    try {
      const userDto = plainToInstance(AuthUserDto, req.body);
      await this.validateDto(userDto);
      const user = await this.service.signIn(userDto);
      if (!user) throw ApiError.BadRequest('Пользователь с такими данными не найден!');

      this.setRefreshTokenCookie(res, user.refreshToken);
      const userData = this.mapUserDataToUserDto(user);
      res.send(userData);
    } catch (e) {
      next(e);
    }
  };
  signOut: RequestHandler = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.service.signOut(refreshToken);
      res.clearCookie('refreshToken');
      res.send(token);
    } catch (e) {
      next(e);
    }
  };

  refresh: RequestHandler = async (req, res, next) => {
    try {
      const userTokenData = req.customLocals.patientTokenData;

      if (!userTokenData) throw ApiError.UnauthorizedError();
      const refreshedUserData = await this.service.refresh(userTokenData);

      if (!refreshedUserData) throw ApiError.BadRequest('Пользователь с такими данными не найден!');

      this.setRefreshTokenCookie(res, refreshedUserData.refreshToken);
      res.send(this.mapUserDataToUserDto(refreshedUserData));
    } catch (e) {
      next(e);
    }
  };
  activate: RequestHandler = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      await this.service.activate(refreshToken);
      res.send('User activated successfully');
    } catch (error) {
      next(error);
    }
  };

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  private mapUserDataToUserDto(userData: IUser) {
    return plainToInstance(UserDto, userData, { excludeExtraneousValues: true });
  }
  private async validateDto(dto: AuthUserDto) {
    const errors = await validate(dto, {
      whitelist: true,
      validationError: { target: false, value: false },
    });
    if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', formatErrors(errors));
  }
}
