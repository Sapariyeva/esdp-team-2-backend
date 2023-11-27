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
      const { dto, errors } = await DtoManager.createDto(RecordDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);
      const record = await this.service.createRecord(dto);
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
      if (!id) throw ApiError.BadRequest('Не верно указан id метода терапии');
      const { dto, errors } = await DtoManager.createDto(RecordDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);
      const record = await this.service.getOneRecord(id);
      if (!record) throw ApiError.NotFound('Не удалось найти сеанс');

      const cancelRecord = await this.service.cancelRecord(dto);
      res.send(cancelRecord);
    } catch (e) {
      next(e);
    }
  };
}
