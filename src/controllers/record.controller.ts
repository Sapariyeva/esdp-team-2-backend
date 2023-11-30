import { RequestHandler } from 'express';
import DtoManager from '../helpers/dtoManager';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { RecordService } from '../services/record.service';
import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';

export class RecordController {
  private service: RecordService;

  constructor() {
    this.service = new RecordService();
  }

  public createRecord: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const { id: userId } = req.customLocals.userJwtPayload;
      const { dto } = await DtoManager.createDto(RecordDto, req.body);
      const checkPsycho = await this.service.checkPsychologists(dto.psychologistId);
      if (checkPsycho === null) throw ApiError.NotFound('Не правильный id психолога');

      const checkPatient = await this.service.checkPatient(userId);
      if (checkPatient === null) throw ApiError.NotFound('Не правильный id пациента');

      dto.patientId = checkPatient.id;
      dto.patientName = checkPatient.name;
      const record = await this.service.createRecord(checkPsycho, dto);
      res.send(record);
    } catch (e) {
      next(e);
    }
  };

  public getAllRecords: RequestHandler = async (req, res, next) => {
    try {
      const record: IRecord[] = await this.service.getAllRecords();
      res.send(record);
    } catch (e) {
      next(e);
    }
  };

  public getOneRecord: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id сеанса');

      const record = await this.service.getOneRecord(id);
      if (!record) throw ApiError.NotFound('Не удалось найти сеанс');

      res.send(record);
    } catch (error) {
      next(error);
    }
  };

  public cancelRecord: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const check = await this.service.checkRecord(id);
      if (!check) throw ApiError.BadRequest('Не существует такой записи');

      const cancelRecord = await this.service.cancelRecord(check);
      res.send(cancelRecord);
    } catch (e) {
      next(e);
    }
  };
}
