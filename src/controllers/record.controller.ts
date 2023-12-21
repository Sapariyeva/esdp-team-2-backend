import { RequestHandler } from 'express';
import DtoManager from '../helpers/dtoManager';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { RecordService } from '../services/record.service';
import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';
import { WorkTImeService } from '../services/workTIme.service';
import { ZoomService } from '../services/zoom.service';

export class RecordController {
  private service: RecordService;
  private workTimeService: WorkTImeService;
  private zoomService: ZoomService;

  constructor() {
    this.service = new RecordService();
    this.workTimeService = new WorkTImeService();
    this.zoomService = new ZoomService();
  }

  public createRecord: RequestHandler = async (req, res, next) => {
    try {
      let url;
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const checkPsycho = await this.service.checkPsychologists(req.body.psychologistId);
      if (checkPsycho === null) throw ApiError.NotFound('Не правильный id психолога');

      const checkPatient = await this.service.checkPatient(userId);
      if (checkPatient === null) throw ApiError.NotFound('Не правильный id пациента');

      if (req.body.format === 'online') url = await this.zoomService.zoom(`Сеанс у ${checkPsycho.fullName}`, req.body.datetime);

      const { id: patientId, name: patientName } = checkPatient;
      const { dto } = await DtoManager.createDto(RecordDto, { ...req.body, patientId, patientName }, { isValidate: true });

      const record = await this.service.createRecord(checkPsycho, dto, url);
      if (!record) throw ApiError.BadRequest('Не удалось записаться к психологу!');
      await this.workTimeService.changeStatusTime(checkPsycho.id, dto.slotId, true);

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
