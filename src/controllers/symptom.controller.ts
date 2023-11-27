import { RequestHandler } from 'express';
import { SymptomService } from '../services/symptom.service';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import { ISymptom } from '../interfaces/ISymptom.interface';
import DtoManager from '../helpers/dtoManager';
import { SymptomDto } from '../dto/symptom.dto';

export class SymptomController {
  private service: SymptomService;

  constructor() {
    this.service = new SymptomService();
  }

  getSymptoms: RequestHandler = async (req, res, next) => {
    try {
      res.send(await this.service.getSymptoms());
    } catch (error) {
      next(error);
    }
  };

  getSymptom: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const symptom = await this.service.getSymptom(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом');

      res.send(symptom);
    } catch (error) {
      next(error);
    }
  };

  createSymptom: RequestHandler = async (req, res, next) => {
    try {
      const { dto, errors } = await DtoManager.createDto(SymptomDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const newSymptom = await this.service.createSymptom(dto);
      if (!newSymptom) throw ApiError.BadRequest('Не удалось создать!');

      res.send(newSymptom);
    } catch (error) {
      next(error);
    }
  };

  deleteSymptom: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const symptom: ISymptom | null = await this.service.getSymptom(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом!');

      const result = await this.service.deleteSymptom(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить!');

      res.send({ id });
    } catch (error) {
      next(error);
    }
  };

  editSymptom: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const symptom: ISymptom | null = await this.service.getSymptom(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом!');

      const { dto, errors } = await DtoManager.createDto(SymptomDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const updatedSymptom = await this.service.editSymptom(symptom, dto);
      if (!updatedSymptom) throw ApiError.BadRequest('Не удалось изменить!');

      res.send(updatedSymptom);
    } catch (error) {
      next(error);
    }
  };
}
