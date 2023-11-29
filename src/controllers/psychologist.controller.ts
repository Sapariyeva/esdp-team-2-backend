import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { PsychologistService } from '../services/psychologist.service';
import validateNumber from '../helpers/validateNumber';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

import DtoManager from '../helpers/dtoManager';
import { PsychologistDto } from '../dto/psychologist.dto';
import FileManager from '../helpers/fileManager';
import config from '../config';

export class PsychologistController {
  private service: PsychologistService;

  constructor() {
    this.service = new PsychologistService();
  }

  public createPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      if (!req.files || Array.isArray(req.files) || !req.files['photos'] || !req.files['certificates'])
        throw ApiError.BadRequest('Отсутствие фотографий или сертификатов в заявке!');

      const isUserExists: IPsychologist | null = await this.service.getOnePsychologistByUserId(userId);
      if (isUserExists) throw ApiError.BadRequest('Данные психолога у текущего пользователя уже существуют');

      const { dto, errors } = await DtoManager.createDto(PsychologistDto, { ...req.body, userId }, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const certificateList: string[] = req.files.certificates.map((file) => file.filename);
      const photosList: string[] = req.files.photos.map((file) => file.filename);

      const newPsychologist = await this.service.createPsychologist(dto, certificateList, photosList);
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

  public editPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.service.getOnePsychologistByUserId(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const { dto, errors } = await DtoManager.createDto(PsychologistDto, { ...req.body, userId }, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const updatedPsychologist = await this.service.editPsychologist(psychologist, dto);
      if (!updatedPsychologist) throw ApiError.BadRequest('При обновлении статуса психолога возникла ошибка.');

      res.send(updatedPsychologist);
    } catch (e) {
      next(e);
    }
  };
  public publishPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id психолога');

      const psychologist: IPsychologist | null = await this.service.getOnePsychologist(id);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const result = await this.service.publishPsychologist(id);
      if (!result) throw ApiError.BadRequest('Не удалось опубликовать психолога!');

      res.send({ message: `Статус психолога с идентификатором ${id} успешно обновлён.` });
    } catch (e) {
      next(e);
    }
  };
  deletePsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const psychologist = await this.service.getOnePsychologist(id);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const result = await this.service.deletePsychologist(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить психолога!');

      res.send({ message: `Психолог с идентификатором ${id} успешно удалён.` });
    } catch (error) {
      next(error);
    }
  };
}
