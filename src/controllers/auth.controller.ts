import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { SignInPatientDto } from '../dto/signInPatient.dto';
import { SignUpPatientDto } from '../dto/signUpPatient.dto';
import { PatientDto } from '../dto/patient.dto';
import { Response } from 'express';
import { validate } from 'class-validator';
import { ApiError } from '../helpers/api-error';
import { formatErrors } from '../helpers/formatErrors';
import { IPatient, IPatientTokenData } from '../interfaces/IPatient.interface';

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  signUp: RequestHandler = async (req, res, next) => {
    try {
      const signUpPatientDto = plainToInstance(SignUpPatientDto, req.body);
      await this.validateDto(signUpPatientDto);

      const patientData = await this.service.signUp(signUpPatientDto);
      if (!patientData) throw ApiError.BadRequest('Пользователь с такими данными уже зарегистрирован');

      this.setRefreshTokenCookie(res, patientData.refreshToken);
      res.send(this.mapUserDataToUserDto(patientData));
    } catch (e) {
      next(e);
    }
  };
  refresh: RequestHandler = async (req, res, next) => {
    try {
      const patientTokenData = req.customLocals.patientTokenData;

      if (!patientTokenData) throw ApiError.UnauthorizedError();

      const refreshedPatientData = await this.service.refresh(patientTokenData);
      this.handleSuccessfulRefresh(res, refreshedPatientData);
    } catch (e) {
      next(e);
    }
  };

  signIn: RequestHandler = async (req, res, next) => {
    try {
      const signInUserDto = plainToInstance(SignInPatientDto, req.body);
      console.log(await this.validateDto(signInUserDto));
      const patient = await this.service.signIn(signInUserDto);
      if (!patient) throw ApiError.BadRequest('Пользователь с такими данными не найден!');

      this.setRefreshTokenCookie(res, patient.refreshToken);
      const userData = this.mapUserDataToUserDto(patient);
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

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  private mapUserDataToUserDto(patientData: IPatient): PatientDto {
    return plainToInstance(PatientDto, patientData, { excludeExtraneousValues: true });
  }
  private async validateDto(dto: SignUpPatientDto | SignInPatientDto) {
    const errors = await validate(dto, {
      whitelist: true,
      validationError: { target: false, value: false },
    });
    if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', formatErrors(errors));
  }
  private handleSuccessfulRefresh(res: Response, refreshedUserData: IPatientTokenData | null) {
    if (!refreshedUserData) throw ApiError.BadRequest('User not exist');
    this.setRefreshTokenCookie(res, refreshedUserData.refreshToken);
    res.send(this.mapUserDataToUserDto(refreshedUserData));
  }
}
