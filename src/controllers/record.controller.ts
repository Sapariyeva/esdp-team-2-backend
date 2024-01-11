import { RequestHandler } from 'express';
import DtoManager from '../helpers/dtoManager';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { RecordService } from '../services/record.service';
import { RecordDto } from '../dto/record.dto';
import { WorkTImeService } from '../services/workTIme.service';
import { ZoomService } from '../services/zoom.service';
import { TransferRecord } from '../dto/transferRecord.dto';
import { PsychologistService } from '../services/psychologist.service';
import { CommentDto } from '../dto/recordComment.dto';

export class RecordController {
  private service: RecordService;
  private workTimeService: WorkTImeService;
  private zoomService: ZoomService;
  private psychologistService: PsychologistService;

  constructor() {
    this.service = new RecordService();
    this.workTimeService = new WorkTImeService();
    this.zoomService = new ZoomService();
    this.psychologistService = new PsychologistService();
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
  public transferRecord: RequestHandler = async (req, res, next) => {
    try {
      let broadcast;
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { dto } = await DtoManager.createDto(TransferRecord, { ...req.body }, { isValidate: true });

      const record = await this.service.getOneRecord(dto.id);
      if (!record) throw ApiError.BadRequest('Не удалось найти запись');

      if (record.format === 'online') broadcast = await this.zoomService.zoom(`Сеанс у ${record.psychologistName}`, dto.newDateTime);

      await this.workTimeService.changeStatusTime(record.psychologistId, record.slotId, false);

      await this.workTimeService.changeStatusTime(record.psychologistId, dto.newSlotId, true);

      const updateRecord = await this.service.transferRecord(record.id, dto.newDateTime, broadcast);
      if (!updateRecord) throw ApiError.BadRequest('Не удалось перенести запись');

      const newRecord = await this.service.getOneRecord(dto.id);
      res.send(newRecord);
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

  public deleteRecord: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const check = await this.service.checkRecord(id);
      if (!check) throw ApiError.BadRequest('Не существует такой записи');

      const cancelRecord = await this.service.updateRecordStatus(id, 'canceled');
      if (!cancelRecord) throw ApiError.BadRequest('Не удалось отменить запись.');

      await this.workTimeService.changeStatusTime(check.psychologistId, check.slotId, false);

      res.send(cancelRecord);
    } catch (e) {
      next(e);
    }
  };
  public createCommentPatient: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const { dto } = await DtoManager.createDto(CommentDto, { ...req.body }, { isValidate: true });

      const { id: userId } = req.customLocals.userJwtPayload;

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const record = await this.service.checkRecord(id);
      if (!record) throw ApiError.BadRequest('Не существует такой записи');

      const Patient = await this.service.checkPatient(userId);
      if (Patient === null) throw ApiError.NotFound('Не правильный id пациента');

      if (Patient.id !== record.patientId) throw ApiError.BadRequest('Id пациента не совпадает с id записи');
      const updatedComment = await this.service.createCommentPatient(id, dto.comment);

      res.send(updatedComment);
    } catch (error) {
      next(error);
    }
  };

  public createCommentPsychologist: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const { dto } = await DtoManager.createDto(CommentDto, { ...req.body }, { isValidate: true });

      const { id: userId } = req.customLocals.userJwtPayload;

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const record = await this.service.checkRecord(id);
      if (!record) throw ApiError.BadRequest('Не существует такой записи');

      const Psycho = await this.psychologistService.getOnePsychologistByUserId(userId);

      if (Psycho === null) throw ApiError.NotFound('Не правильный id психолога');

      if (Psycho.id !== record.psychologistId) throw ApiError.BadRequest('Id пациента не совпадает с id записи');

      const updatedComment = await this.service.createCommentPsychologist(id, dto.comment);

      res.send(updatedComment);
    } catch (error) {
      next(error);
    }
  };
}
