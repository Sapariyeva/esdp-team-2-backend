import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiError } from '../helpers/api-error';
import { IUserJwtPayload, IUserTokens } from '../interfaces/IUser.interface';
import { UserDto } from '../dto/user.dto';
import DtoManager from '../helpers/dtoManager';
import { UserEditAccountDto } from '../dto/userEditAccount.dto';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRole } from '../interfaces/UserRole.enum';
import { UserRegisterRequestDto } from '../dto/userRegisterRequest.dto';
import FileManager from '../helpers/fileManager';
import { PsychologistDto } from '../dto/psychologist.dto';
import { PsychologistService } from '../services/psychologist.service';
import { UserLoginRequest } from '../dto/userLoginRequest.dto';
import { UserRequestPasswordForgotDto } from '../dto/userRequestPasswordForgot';
import { UserRequestPasswordResetDto } from '../dto/userRequestPasswordReset';
import { AdminLoginRequest } from '../dto/adminLoginRequest.dto';

export class AuthController {
  private refreshToken = { name: 'refreshToken', options: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true } };
  private service: AuthService;
  private patientService: PatientService;
  private psychologistService: PsychologistService;

  constructor() {
    this.service = new AuthService();
    this.patientService = new PatientService();
    this.psychologistService = new PsychologistService();
  }

  registerPatientHandler: RequestHandler = async (req, res, next) => {
    try {
      const roleName: UserRole = UserRole.Patient;

      const { dto: userDto, errors: userErrors } = await DtoManager.createDto(UserRegisterRequestDto, req.body, { isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const { dto: patientDto, errors: patientErrors } = await DtoManager.createDto(PatientDto, req.body, { isValidate: true });
      if (patientErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', patientErrors);

      const existingUser = await this.service.getUserByEmail(userDto.email);

      const isUserHavePatient: boolean = !!existingUser && this.service.isUserHaveRole(existingUser, roleName);
      if (isUserHavePatient) throw ApiError.BadRequest('Пользователь с таким email уже существует');

      const isValidPassword: boolean = !!existingUser && (await this.service.isValidPassword(existingUser, userDto.password));
      if (existingUser && !isValidPassword) throw ApiError.BadRequest('Введен неверный пароль для указанного email');

      const patientEntity = this.patientService.createPatientEntity(patientDto);

      const newUserPatient = await this.service.registerUser(existingUser || userDto, patientEntity, roleName);
      if (!newUserPatient) throw ApiError.BadRequest('Не удалось создать пользователя пациента!');

      const { id, accessToken, refreshToken } = newUserPatient;
      const userPatient = await this.service.getUserByIdWithRole(id, roleName);
      if (!userPatient) throw ApiError.BadRequest('Не удалось найти созданного пользователя пациента!');

      if (!userPatient.isActivated) this.service.emailSendMessage(userPatient.email, userPatient.id, roleName);

      const { dto } = await DtoManager.createDto(UserDto, { ...userPatient, accessToken, role: roleName });
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.json(dto);
    } catch (e) {
      next(e);
    }
  };

  registerPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      const roleName: UserRole = UserRole.Psychologist;

      if (!req.files || Array.isArray(req.files) || !req.files['photos'] || !req.files['certificates'])
        throw ApiError.BadRequest('Отсутствие фотографий или сертификатов в заявке!');

      const { dto: userDto, errors: userErrors } = await DtoManager.createDto(UserRegisterRequestDto, req.body, { isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const { dto: psychologistDto, errors: psychologistErrors } = await DtoManager.createDto(PsychologistDto, req.body, { isValidate: true });
      if (psychologistErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', psychologistErrors);

      const existingUser = await this.service.getUserByEmail(userDto.email);

      const isUserHavePsychologist: boolean = !!existingUser && this.service.isUserHaveRole(existingUser, roleName);
      if (isUserHavePsychologist) throw ApiError.BadRequest('Пользователь с таким email уже существует');

      const isValidPassword: boolean = !!existingUser && (await this.service.isValidPassword(existingUser, userDto.password));
      if (existingUser && !isValidPassword) throw ApiError.BadRequest('Введен неверный пароль для указанного email');

      const certificateList: string[] = req.files.certificates.map((file) => file.filename);
      const photosList: string[] = req.files.photos.map((file) => file.filename);
      const psychologistEntity = await this.psychologistService.createPsychologistEntity(psychologistDto, certificateList, photosList);

      const newUserPsychologist = await this.service.registerUser(existingUser || userDto, psychologistEntity, roleName);
      if (!newUserPsychologist) throw ApiError.BadRequest('Не удалось создать пользователя психолога!');

      const { id, accessToken, refreshToken } = newUserPsychologist;
      const userPsychologist = await this.service.getUserByIdWithRole(id, roleName);
      if (!userPsychologist) throw ApiError.BadRequest('Не удалось найти созданного пользователя психолога!');

      if (!userPsychologist.isActivated) this.service.emailSendMessage(userPsychologist.email, userPsychologist.id, roleName);

      const { dto } = await DtoManager.createDto(UserDto, { ...userPsychologist, accessToken, role: roleName });
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.json(dto);
    } catch (e) {
      FileManager.deleteFiles(config.uploadPath, req.files);
      next(e);
    }
  };

  loginUserHandler: RequestHandler = async (req, res, next) => {
    try {
      const { dto: userDto, errors: userErrors } = await DtoManager.createDto(UserLoginRequest, req.body, { isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const existingUser = await this.service.getUserByEmail(userDto.email);

      const isUserHaveRole: boolean = !!existingUser && this.service.isUserHaveRole(existingUser, userDto.role);
      if (!(existingUser && isUserHaveRole)) throw ApiError.BadRequest('Данного пользователя не существует');

      const isValidPassword: boolean = await this.service.isValidPassword(existingUser, userDto.password);
      if (!isValidPassword) throw ApiError.BadRequest('Введен неверный email или пароль');

      const { id, accessToken, refreshToken } = await this.service.loginUser(existingUser, userDto.role);

      const loggedUser = await this.service.getUserByIdWithRole(id, userDto.role);
      if (!loggedUser) throw ApiError.BadRequest('Не удалось найти пользователя!');

      if (!loggedUser.isActivated) this.service.emailSendMessage(loggedUser.email, loggedUser.id, userDto.role);

      const { dto } = await DtoManager.createDto(UserDto, { ...loggedUser, accessToken, role: userDto.role });
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.json(dto);
    } catch (e) {
      next(e);
    }
  };

  loginAdminHandler: RequestHandler = async (req, res, next) => {
    try {
      const roleAdmin: UserRole = UserRole.Admin;

      const { dto: userDto, errors: userErrors } = await DtoManager.createDto(AdminLoginRequest, req.body, { isValidate: true });
      if (userErrors.length) throw ApiError.BadRequest('Ошибка при валидации формы', userErrors);

      const existingUser = await this.service.getUserByUsername(userDto.username);

      const isUserHaveRole: boolean = !!existingUser && this.service.isUserHaveRole(existingUser, roleAdmin);
      if (!(existingUser && isUserHaveRole)) throw ApiError.BadRequest('Введен неверно имя пользователя или пароль');

      const isValidPassword: boolean = await this.service.isValidPassword(existingUser, userDto.password);
      if (!isValidPassword) throw ApiError.BadRequest('Введен неверно имя пользователя или пароль');

      const { id, accessToken, refreshToken } = await this.service.loginUser(existingUser, roleAdmin);

      const loggedUser = await this.service.findOneUser(id);
      if (!loggedUser) throw ApiError.BadRequest('Не удалось найти пользователя!');

      const { dto } = await DtoManager.createDto(UserDto, { ...loggedUser, accessToken, role: roleAdmin });
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.json(dto);
    } catch (e) {
      next(e);
    }
  };

  logoutUserHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload) throw ApiError.UnauthorizedError();

      const { id, role } = req.customLocals.userJwtPayload;
      if (!(id && role)) throw ApiError.UnauthorizedError();

      await this.service.logoutUser(id, role);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  updateRefreshTokenHandler: RequestHandler = async (req, res, next) => {
    try {
      const oldRefreshToken = req.cookies.refreshToken as unknown;
      if (typeof oldRefreshToken !== 'string') throw new Error('Отсутствует рефреш токен в запросе');

      const { id, role } = jwt.verify(oldRefreshToken, config.secretKeyRefresh) as IUserJwtPayload;
      if (!(id && role)) throw new Error('Необходимые данные токена отсутствуют');

      const userTokens: IUserTokens | null = await this.service.generateRefreshTokenByUserId(id, role, oldRefreshToken);
      if (!userTokens) throw new Error('Запрещено обновление рефреш токена');

      const { refreshToken, accessToken } = userTokens;
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.send({ accessToken });
    } catch (e) {
      next(ApiError.Forbidden());
    }
  };

  activateEmail: RequestHandler = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const roleName = req.query.role as string;
      if (!id && !roleName) throw ApiError.BadRequest('Неверный id');

      const user = await this.service.activateEmail(id, roleName);
      if (!user?.email) throw ApiError.BadRequest('Email не существует');

      const { accessToken, refreshToken } = await this.service.loginUser(user, roleName as UserRole);

      const { dto } = await DtoManager.createDto(UserDto, { ...user, accessToken, role: roleName });
      res.cookie(this.refreshToken.name, refreshToken, this.refreshToken.options);
      res.json(dto);
    } catch (error) {
      next(error);
    }
  };

  sendConfirmationLinkToEmail: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const id = req.customLocals.userJwtPayload.id;
      const role = req.customLocals.userJwtPayload.role;
      if (!role) throw ApiError.BadRequest('Role не существует');

      const user = await this.service.findOneUser(id);
      if (!user?.email) throw ApiError.BadRequest('Email не существует');

      await this.service.emailSendMessage(user.email, user.id, role);
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

      const { сurrentPassword, ...restUserDto } = dto;
      const user = await this.service.checkPassword(userId, сurrentPassword);
      if (!user) throw ApiError.NotFound('Неверный пароль!');
      const existingUser = await this.service.getUserByEmail(dto.email as string);
      if (!existingUser || existingUser.email === user.email) {
        const { updatedUser, passwordUpdated } = await this.service.editUser(user, restUserDto);
        if (!updatedUser) throw ApiError.BadRequest('Не удалось получить обновленные данные пользователя');
        const newUser = await this.service.findOneUserWithRealtions(userId);
        if (passwordUpdated) {
          res.send(newUser);
        } else {
          res.send({ email: restUserDto.email, phone: restUserDto.phone });
        }
      } else {
        throw ApiError.BadRequest('Пользователь с таким email уже существует');
      }
    } catch (e) {
      next(e);
    }
  };

  passwordForgotHandler: RequestHandler = async (req, res, next) => {
    try {
      const { dto, errors } = await DtoManager.createDto(UserRequestPasswordForgotDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const user = await this.service.getUserByEmail(dto.email);
      if (!user) throw ApiError.BadRequest('Email не существует');

      await this.service.emailMessagePasswordForgot(user);
      res.send('Письмо для сброса пароля отправлено на почту');
    } catch (e) {
      next(e);
    }
  };

  passwordResetHandler: RequestHandler = async (req, res, next) => {
    try {
      const token = req.query.token;
      if (typeof token !== 'string') throw ApiError.UnauthorizedError();
      console.log(token);

      const { id } = jwt.verify(token, config.secretKeyPasswordReset) as IUserJwtPayload;
      if (!id) throw ApiError.UnauthorizedError();

      const { dto, errors } = await DtoManager.createDto(UserRequestPasswordResetDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const user = await this.service.findOneUser(id);
      if (!user) throw ApiError.BadRequest('Данные не найдены');

      await this.service.resetPassword(user, dto.password);
      res.send('Пароль изменен успешно');
    } catch (e) {
      next(e);
    }
  };
}
