import { RequestHandler } from 'express';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import DtoManager from '../helpers/dtoManager';
import { PatientService } from '../services/patient.service';
import { PatientDto } from '../dto/patient.dto';
import { PsychologistService } from '../services/psychologist.service';

export class PatientController {
  private service: PatientService;
  private psychologistService: PsychologistService;

  constructor() {
    this.service = new PatientService();
    this.psychologistService = new PsychologistService();
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

      res.send(patient);
    } catch (error) {
      next(error);
    }
  };

  createPatient: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const { id: userId } = req.customLocals.userJwtPayload;

      const userExists = await this.service.checkUserExists(userId);
      if (!userExists) throw ApiError.NotFound('Пользователь с указанным user_id не найден.');

      const isPatientAllowed: boolean = await this.service.isPatientCreatable(userId);
      if (!isPatientAllowed) throw ApiError.BadRequest('Данные пациента у текущего пользователя уже существуют');

      const patientRawData = { ...req.body, userId };
      const { dto, errors } = await DtoManager.createDto(PatientDto, patientRawData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const newPatient = await this.service.createPatient(dto);
      if (!newPatient) throw ApiError.BadRequest('Не удалось создать пациента!');

      res.send(newPatient);
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
      const patientId = validateNumber(req.params.id);
      if (!patientId) throw ApiError.BadRequest('Не верно указан id пациента');

      const patient = await this.service.getPatient(patientId);
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
}
