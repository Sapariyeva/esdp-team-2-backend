import { RequestHandler } from 'express';
import { SymptomService } from '../services/symptom.service';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import { ISymptom } from '../interfaces/ISymptom.interface';

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
      const symptomData = { ...req.body };
      const { symptomDto, errors } = await this.service.getSymptomDto(symptomData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const newSymptom = await this.service.createSymptom(symptomDto);
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

      const symptom: ISymptom | undefined = await this.service.getSymptom(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом!');

      await this.service.deleteSymptom(id);
      res.status(200).send({ message: 'Симптом успешно удалён' });
    } catch (error) {
      next(error);
    }
  };

  editSymptom: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const symptom: ISymptom | undefined = await this.service.getSymptom(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом!');

      const symptomData = { ...req.body };
      const { symptomDto, errors } = await this.service.getSymptomDto(symptomData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const updatedSymptom = await this.service.editSymptom(id, symptomDto);
      if (!updatedSymptom) throw ApiError.BadRequest('Не удалось изменить!');

      res.send(updatedSymptom);
    } catch (error) {
      next(error);
    }
  };
}
