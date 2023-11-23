import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { PsychologistService } from '../services/psychologist.service';
import config from '../config';
import FileManager from '../helpers/fileManager';
import validateNumber from '../helpers/validateNumber';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

export class PsychologistController {
  private service: PsychologistService;

  constructor() {
    this.service = new PsychologistService();
  }

  public createPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      if (!req.files || Array.isArray(req.files)) throw ApiError.BadRequest('Ошибка при обработке изображений');

      const { id: userId } = req.customLocals.userJwtPayload;
      const isPsychologistAllowed: boolean = await this.service.isPsychologistCreatable(userId);
      if (!isPsychologistAllowed) throw ApiError.BadRequest('Данные психолога у текущего пользователя уже существуют');

      const photo: string = req.files.photo[0].filename;
      const psychologistRawData = { ...req.body, userId, photo };
      const { psychologistDto, errors } = await this.service.getPsychologistDto(psychologistRawData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const certificateList: string[] = req.files.certificates.map((file) => file.filename);
      const newPsychologist = await this.service.createPsychologist(psychologistDto, certificateList);
      if (!newPsychologist) throw ApiError.BadRequest('Не удалось создать психолога');

      res.send(newPsychologist);
    } catch (e) {
      FileManager.deleteFiles(config.uploadPath, req.files);
      next(e);
    }
  };

  public getOnePsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id психолога');

      const psychologist: IPsychologist | null = await this.service.getOnePsychologist(id);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога');

      res.send(psychologist);
    } catch (e) {
      next(e);
    }
  };

  public getPsychologistsHandler: RequestHandler = async (req, res, next) => {
    try {
      const psychologists: IPsychologist[] = await this.service.getPsychologists();

      res.send(psychologists);
    } catch (e) {
      next(e);
    }
  };
}
