import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { PsychologistService } from '../services/psychologist.service';
import validateNumber from '../helpers/validateNumber';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import DtoManager from '../helpers/dtoManager';
import { PsychologistDto } from '../dto/psychologist.dto';
import { FiltersOfPsychologistDto } from '../dto/filtersOfPsychologist.dto';

export class PsychologistController {
  private service: PsychologistService;

  constructor() {
    this.service = new PsychologistService();
  }

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

  public getPsychologistsByIds: RequestHandler = async (req, res, next) => {
    try {
      const ids = req.params.ids
        .split(',')
        .map((id) => validateNumber(id))
        .filter((id): id is number => id !== null);

      if (!ids.length) throw ApiError.BadRequest('Не указаны ids психологов');

      const psychologist = await this.service.findPsychologistsByIds(ids);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психологов');

      res.send(psychologist);
    } catch (e) {
      next(e);
    }
  };

  public getPsychologistsHandler: RequestHandler = async (req, res, next) => {
    try {
      const isPublish = req.query.isPublish as string;
      if (isPublish === undefined) throw ApiError.NotFound('Не верный статус');
      const status = isPublish.toLowerCase() === 'true';

      const psychologists: IPsychologist[] = await this.service.getPsychologists(status);
      const userId = req.customLocals.userJwtPayload?.id;
      const psychologistsWithFavorites: IPsychologist[] = await this.service.markFavoritePsychologists(psychologists, userId);

      res.send(psychologistsWithFavorites);
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

      const { dto, errors } = await DtoManager.createDto(PsychologistDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const updatedPsychologist = await this.service.editPsychologist(psychologist.id, dto);
      if (!updatedPsychologist) throw ApiError.BadRequest('Не удалось получить обновленные данные психолога');

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

  public deletePsychologistHandler: RequestHandler = async (req, res, next) => {
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

  public filterPsychologists: RequestHandler = async (req, res, next) => {
    try {
      const { dto, errors } = await DtoManager.createDto(FiltersOfPsychologistDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации параметров фильтрации', errors);

      const filteredPsychologists = await this.service.filterPsychologists(dto);
      if (!filteredPsychologists) throw ApiError.BadRequest('Не удалось произвести фильтрацию!');

      const userId = req.customLocals.userJwtPayload?.id;
      const psychologistsWithFavorites: IPsychologist[] = await this.service.markFavoritePsychologists(filteredPsychologists, userId);

      res.send(psychologistsWithFavorites);
    } catch (error) {
      next(error);
    }
  };
}
