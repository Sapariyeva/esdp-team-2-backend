import { RequestHandler } from 'express';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import DtoManager from '../helpers/dtoManager';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import { PsychologistService } from '../services/psychologist.service';
import { RecordService } from '../services/record.service';
import { IRecord } from '../interfaces/IRecord.interface';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

export class PatientController {
  private service: PatientService;
  private psychologistService: PsychologistService;
  private recordService: RecordService;

  constructor() {
    this.service = new PatientService();
    this.psychologistService = new PsychologistService();
    this.recordService = new RecordService();
  }

  getPatients: RequestHandler = async (req, res, next) => {
    try {
      res.send(await this.service.getPatients());
    } catch (error) {
      next(error);
    }
  };

  getPatient: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const patient = await this.service.getPatient(id);
      if (!patient) throw ApiError.NotFound('Не удалось найти пациента!');

      const userId = req.customLocals.userJwtPayload?.id;
      await this.psychologistService.markFavoritePsychologists(patient.favorites, userId);

      res.send(patient);
    } catch (error) {
      next(error);
    }
  };

  deletePatient: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const patient = await this.service.getPatient(id);
      if (!patient) throw ApiError.NotFound('Не удалось найти пациента!');

      const result = await this.service.deletePatient(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить пациента!');

      res.send({ id });
    } catch (error) {
      next(error);
    }
  };

  editPatient: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const patientId = validateNumber(req.params.id);
      if (!patientId) throw ApiError.BadRequest('Не верно указан id');

      const patient = await this.service.getPatient(patientId);
      if (!patient) throw ApiError.NotFound('Не удалось найти пациента!');

      if (patient?.userId !== userId) throw ApiError.Forbidden();

      const patientRawData = { ...req.body, userId };
      const { dto, errors } = await DtoManager.createDto(PatientDto, patientRawData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const updatedPatient = await this.service.editPatient(patient, dto);
      if (!updatedPatient) throw ApiError.BadRequest('Не удалось изменить пациента!');

      res.send(updatedPatient);
    } catch (error) {
      next(error);
    }
  };

  changeToFavorites: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const patient = await this.service.getPatientByUserId(userId);
      if (!patient || !Array.isArray(patient?.favorites)) throw ApiError.NotFound('Не удалось найти пациента!');

      const psychologistId = validateNumber(req.body.psychologistId);
      if (!psychologistId) throw ApiError.BadRequest('Не верно указан id психолога');

      const psychologist = await this.psychologistService.getOnePsychologist(psychologistId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const updatedFavorites = await this.service.changeToFavorites(patient, psychologist);
      if (!updatedFavorites) throw ApiError.BadRequest('Не удалось добавить в избранное!');

      res.send(updatedFavorites);
    } catch (error) {
      next(error);
    }
  };

  updateLastPsychologists: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const patient = await this.service.getPatientWithLastPsychologists(userId);
      if (!patient) throw ApiError.NotFound('Не удалось найти пациента!');

      const psychologistId = validateNumber(req.params.id);
      if (!psychologistId) throw ApiError.BadRequest('Не верно указан id психолога');

      const psychologist = await this.psychologistService.getOnePsychologist(psychologistId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const updatedLastPsychologists = await this.service.updateViewedPsychologists(patient, psychologist);
      if (!updatedLastPsychologists) throw ApiError.BadRequest('Не удалось добавить в просмотренных психологов!');

      res.send(updatedLastPsychologists);
    } catch (error) {
      next(error);
    }
  };

  getVeiewedPsychologists: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const patient = await this.service.getPatientWithLastPsychologists(userId);
      if (!patient) throw ApiError.NotFound('Не удалось найти пациента!');

      const viewedPsychologists = await this.service.getVeiewedPsychologists(patient);
      if (!viewedPsychologists) throw ApiError.BadRequest('Не удалось получить просмотренных психологов!');

      const psychologistsWithFavorites: IPsychologist[] = await this.psychologistService.markFavoritePsychologists(viewedPsychologists, userId);

      res.send(psychologistsWithFavorites);
    } catch (error) {
      next(error);
    }
  };

  public getRecordsHistory: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const checkPatient = await this.recordService.checkPatient(userId);
      if (checkPatient === null) throw ApiError.NotFound('Не правильный id пациента');

      const record: IRecord[] = await this.recordService.getAllRecords(checkPatient.id, false);
      if (!record) throw ApiError.BadRequest('Ошибка при получение актуальных записей');

      res.send(record);
    } catch (e) {
      next(e);
    }
  };
  public getRecordsActual: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const checkPatient = await this.recordService.checkPatient(userId);
      if (checkPatient === null) throw ApiError.NotFound('Не правильный id пациента');

      const record: IRecord[] = await this.recordService.getAllRecords(checkPatient.id, true);
      if (!record) throw ApiError.BadRequest('Ошибка при получение актуальных записей');

      res.send(record);
    } catch (e) {
      next(e);
    }
  };
}
