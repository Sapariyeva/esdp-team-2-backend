import { RequestHandler } from 'express';
import { WorkTImeService } from '../services/workTIme.service';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import DtoManager from '../helpers/dtoManager';
import { ScheduleItemDto } from '../dto/scheduleItem.dto';
import { PsychologistService } from '../services/psychologist.service';

export class WorkTimeController {
  private service: WorkTImeService;
  private psychologistService: PsychologistService;

  constructor() {
    this.service = new WorkTImeService();
    this.psychologistService = new PsychologistService();
  }

  public createScheduleItem: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.psychologistService.getOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const { dto, errors } = await DtoManager.createDto(ScheduleItemDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const scheduleItem = await this.service.createScheduleItem(dto, psychologist.id);
      if (!scheduleItem) throw ApiError.BadRequest('Такое время уже добавлено!');

      res.send(scheduleItem);
    } catch (e) {
      next(e);
    }
  };

  getAllWorkTime: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.psychologistService.getOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const date = req.query.date as string;
      const isValidDate = /\d{4}-\d{2}-\d{2}/.test(date);
      if (!isValidDate) throw ApiError.NotFound('Некорректный формат даты!');

      res.send(await this.service.getWorkDaysForPsychologistInDate(psychologist.id, date));
    } catch (e) {
      next(e);
    }
  };

  deleteTime: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.psychologistService.getOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id даты');

      const deleteTime = await this.service.deleteTime(psychologist.id, id);

      if (!deleteTime) throw ApiError.NotFound('Не удалось удалить!');

      res.json({ message: 'Успешно!' });
    } catch (e) {
      next(e);
    }
  };
}
