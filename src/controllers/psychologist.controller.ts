import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { PsychologistService } from '../services/psychologist.service';
import validateNumber from '../helpers/validateNumber';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { IUserJwtPayload } from '../interfaces/IUser.interface';

import DtoManager from '../helpers/dtoManager';
import { PsychologistDto } from '../dto/psychologist.dto';
import FileManager from '../helpers/fileManager';
import config from '../config';
import { FiltersOfPsychologistDto } from '../dto/filtersOfPsychologist.dto';
import jwt from 'jsonwebtoken';
import { PatientService } from '../services/patient.service';

export class PsychologistController {
  private service: PsychologistService;
  private servicePatient: PatientService;

  constructor() {
    this.service = new PsychologistService();
    this.servicePatient = new PatientService();
  }

  public createPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      if (!req.files || Array.isArray(req.files) || !req.files['photos'] || !req.files['certificates'])
        throw ApiError.BadRequest('Отсутствие фотографий или сертификатов в заявке!');

      const { id: userId } = req.customLocals.userJwtPayload;
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
      const accessToken = req.header('Authorization');
      if (!accessToken) throw new Error('Отсутствует токен');

      const { id: userId } = jwt.verify(accessToken, config.secretKey) as IUserJwtPayload;
      if (!userId) throw ApiError.BadRequest('Не верно указан id');

      const patient = await this.servicePatient.getOnePatientById(userId);
      const patientId = patient?.id;
      if (!patientId) throw ApiError.BadRequest('Не верно указан id');

      const psychologists: IPsychologist[] = await this.service.getPsychologists();
      const psychologistsWithFavorites = psychologists.map((psychologist) => ({
        ...psychologist,
        isFavorite: patient?.favorites?.some((favorite) => favorite.id === psychologist.id) || false,
      }));
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

      const { dto, errors } = await DtoManager.createDto(PsychologistDto, { ...req.body, userId }, { isValidate: true });
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
      if (!req.body || Object.keys(req.body).length === 0) throw ApiError.BadRequest('Не указаны параметры фильтрации!');

      const { dto, errors } = await DtoManager.createDto(FiltersOfPsychologistDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации параметров фильтрации', errors);

      const filteredPsychologists = await this.service.filterPsychologists(dto);
      if (!filteredPsychologists) throw ApiError.BadRequest('Не удалось произвести фильтрацию!');

      res.send(filteredPsychologists);
    } catch (error) {
      next(error);
    }
  };
}
