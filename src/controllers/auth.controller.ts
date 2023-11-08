import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { SignInUserDto } from '../dto/signInUser.dto';
import { SignUpUserDto } from '../dto/signUpUser.dto';
import { UserDto } from '../dto/user.dto';
import { IUser, IUserTokenData } from '../interfaces/IUser.interface';
import { Response } from 'express';
import { validate } from 'class-validator';
import { ApiError } from '../helpers/api-error';
import { formatErrors } from '../helpers/formatErrors';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signUp: RequestHandler = async (req, res, next) => {
    try {
      const signUpUserDto = plainToInstance(SignUpUserDto, req.body);
      await this.validateDto(signUpUserDto);

      const userData = await this.service.signUp(signUpUserDto);
      if (!userData) throw ApiError.BadRequest('Пользователь с такими данными уже зарегистрирован');

      this.setRefreshTokenCookie(res, userData.refreshToken);
      res.send(this.mapUserDataToUserDto(userData));
    } catch (e) {
      next(e);
    }
  };
  refresh: RequestHandler = async (req, res, next) => {
    try {
      const userTokenData = req.customLocals.userTokenData;
      if (!userTokenData) throw ApiError.UnauthorizedError();

      const refreshedUserData = await this.service.refresh(userTokenData);
      this.handleSuccessfulRefresh(res, refreshedUserData);
    } catch (e) {
      next(e);
    }
  };

  signIn: RequestHandler = async (req, res, next) => {
    try {
      const signInUserDto = plainToInstance(SignInUserDto, req.body);
      await this.validateDto(signInUserDto);
      const user = await this.service.signIn(signInUserDto);
      if (!user) throw ApiError.BadRequest('User not exist');
      if (user) this.setRefreshTokenCookie(res, user.refreshToken);
      const userData = this.mapUserDataToUserDto(user);
      res.send(userData);
    } catch (e) {
      next(e);
    }
  };

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  private mapUserDataToUserDto(userData: IUser): UserDto {
    return plainToInstance(UserDto, userData, { excludeExtraneousValues: true });
  }
  private async validateDto(dto: SignUpUserDto | SignInUserDto) {
    const errors = await validate(dto, {
      whitelist: true,
      validationError: { target: false, value: false },
    });
    if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', formatErrors(errors));
  }
  private handleSuccessfulRefresh(res: Response, refreshedUserData: IUserTokenData | null) {
    if (!refreshedUserData) throw ApiError.BadRequest('User not exist');
    this.setRefreshTokenCookie(res, refreshedUserData.refreshToken);
    res.send(this.mapUserDataToUserDto(refreshedUserData));
  }
}
