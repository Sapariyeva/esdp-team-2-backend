import { RequestHandler } from 'express';
import { TherapyMethodService } from '../services/therapyMethod.service';
import { TherapyMethodDto } from '../dto/therapyMethod.dto';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';
import DtoManager from '../helpers/dtoManager';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';

export class TherapyMethodController {
  private service: TherapyMethodService;

  constructor() {
    this.service = new TherapyMethodService();
  }

  public createTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const { dto, errors } = await DtoManager.createDto(TherapyMethodDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const therapyMethod = await this.service.createTherapyMethod(dto);
      res.send(therapyMethod);
    } catch (e) {
      next(e);
    }
  };

  public getAllTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      const therapyMethod: ITherapyMethod[] = await this.service.getAllTherapyMethod();
      res.send(therapyMethod);
    } catch (e) {
      next(e);
    }
  };

  public getOneTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id метода терапии');

      const therapyMethod = await this.service.getOneTherapyMethod(id);
      if (!therapyMethod) throw ApiError.NotFound('Не удалось найти метод терапии');

      res.send(therapyMethod);
    } catch (error) {
      next(error);
    }
  };

  public updateOneTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id метода терапии');

      const { dto, errors } = await DtoManager.createDto(TherapyMethodDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const therapyMethod = await this.service.getOneTherapyMethod(id);
      if (!therapyMethod) throw ApiError.NotFound('Не удалось найти метод терапии');

      const updateTherapyMethod = await this.service.updateOneTherapyMethod({ ...therapyMethod, ...dto });
      res.send(updateTherapyMethod);
    } catch (e) {
      next(e);
    }
  };

  public deleteOneTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id метода терапии');

      await this.service.deleteOneTherapyMethod(id);
      res.json({ id });
    } catch (e) {
      next(e);
    }
  };
}
