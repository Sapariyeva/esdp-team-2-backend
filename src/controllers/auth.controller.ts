import { RequestHandler, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { AuthUserDto } from '../dto/authUser.dto';
import { ApiError } from '../helpers/api-error';
import { validate } from 'class-validator';
import { formatErrors } from '../helpers/formatErrors';
import { IUser, IUserJwtPayload, IUserTokens } from '../interfaces/IUser.interface';
import { UserDto } from '../dto/user.dto';
import DtoManager from '../helpers/dtoManager';
import { UserEditAccountDto } from '../dto/userEditAccount.dto';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import jwt from 'jsonwebtoken';
import config from '../config';

export class AuthController {
  private service: AuthService;
  private patientService: PatientService;
  constructor() {
    this.service = new AuthService();
    this.patientService = new PatientService();
  }

  signUp: RequestHandler = async (req, res, next) => {
    try {
      const userDto = plainToInstance(AuthUserDto, req.body);
      await this.validateDto(userDto);

      const userData = await this.service.signUp(userDto);
      if (!userData) throw ApiError.BadRequest('s');

      this.setRefreshTokenCookie(res, userData.refreshToken);

      const user = this.mapUserDataToUserDto(userData);
      if (user.role.includes('patient')) {
        const isPatientAllowed: boolean = await this.patientService.isPatientCreatable(user.id);
        if (!isPatientAllowed) throw ApiError.BadRequest('Данные пациента у текущего пользователя уже существуют');

        const { dto, errors } = await DtoManager.createDto(PatientDto, { name: userDto.name, userId: user.id }, { isValidate: true });
        if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

        const newPatient = await this.patientService.createPatient(dto);
        if (!newPatient) throw ApiError.BadRequest('Не удалось создать пациента!');
      }
      const getUser = await this.service.findUserByIdWithRelations(user.id, user.role);
      if (!getUser) throw ApiError.BadRequest('Не удалось найти пациента!');
      const getUserByRole = this.mapUserDataToUserDto(getUser);

      res.send(getUserByRole);
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

  updateRefreshTokenHandler: RequestHandler = async (req, res, next) => {
    try {
      const oldRefreshToken = req.cookies.refreshToken as unknown;
      if (typeof oldRefreshToken !== 'string') throw new Error('Отсутствует рефреш токен в запросе');

      const { id: userId } = jwt.verify(oldRefreshToken, config.secretKeyRefresh) as IUserJwtPayload;
      if (!userId) throw new Error('id пользователя отсутствует');

      const userTokens: IUserTokens | null = await this.service.generateRefreshTokenByUserId(userId, oldRefreshToken);
      if (!userTokens) throw new Error('Запрещено обновление рефреш токена');

      const { refreshToken, accessToken } = userTokens;
      this.setRefreshTokenCookie(res, refreshToken);
      res.send({ accessToken });
    } catch (e) {
      next(ApiError.Forbidden());
    }
  };
  activateEmail: RequestHandler = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (!id) throw ApiError.BadRequest('Неверный id');

      const user = await this.service.activateEmail(id);
      if (!user?.email) throw ApiError.BadRequest('Email не существует');
      res.send(user);
    } catch (error) {
      next(error);
    }
  };

  sendConfirmationLinkToEmail: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const id = req.customLocals.userJwtPayload.id;
      const user = await this.service.findOneUser(id);
      if (!user?.email) throw ApiError.BadRequest('Email не существует');
      await this.service.emailSendMessage(user.email, user.id);
      res.send('Письмо для повторного подтверждение отправлено на почту');
    } catch (e) {
      next(e);
    }
  };

  editUserHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const { dto, errors } = await DtoManager.createDto(UserEditAccountDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const existingEmail = await this.service.findUserByEmail(dto.email || '');
      if (existingEmail) {
        throw ApiError.BadRequest('Данный адрес электронной почты уже используется');
      }

      const existingPhone = await this.service.findUserByPhone(dto.phone || '');
      if (existingPhone) {
        throw ApiError.BadRequest('Данный номер телефона уже используется');
      }

      const { сurrentPassword, ...restUserDto } = dto;
      const user = await this.service.checkPassword(userId, сurrentPassword);
      if (!user) throw ApiError.NotFound('Неверный пароль!');

      const { updatedUser, passwordUpdated } = await this.service.editUser(user, restUserDto);
      if (!updatedUser) throw ApiError.BadRequest('Не удалось получить обновленные данные пользователя');

      if (passwordUpdated) {
        res.send('Пароль успешно обновлен');
      } else {
        res.send({ email: restUserDto.email, phone: restUserDto.phone });
      }
    } catch (e) {
      next(e);
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
