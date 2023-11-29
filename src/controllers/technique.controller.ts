import { RequestHandler } from 'express';
import DtoManager from '../helpers/dtoManager';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { TechniqueService } from '../services/technique.service';
import { ITechnique } from '../interfaces/ITechnique.interface';
import { TechniqueDto } from '../dto/technique.dto';

export class TechniqueController {
  private service: TechniqueService;

  constructor() {
    this.service = new TechniqueService();
  }

  public createTechnique: RequestHandler = async (req, res, next) => {
    try {
      const { dto, errors } = await DtoManager.createDto(TechniqueDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);
      const technique = await this.service.createTeqchnique(dto);
      if (!technique) throw ApiError.BadRequest('Не удалось создать!');
      res.send(technique);
    } catch (e) {
      next(e);
    }
  };

  public getAllTechnique: RequestHandler = async (req, res, next) => {
    try {
      const technique: ITechnique[] = await this.service.getAllTechnique();
      res.send(technique);
    } catch (e) {
      next(e);
    }
  };

  public getOneTechnique: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id техники');
      const technique = await this.service.getOneTechnique(id);
      if (!technique) throw ApiError.NotFound('Не удалось найти техники');
      res.send(technique);
    } catch (error) {
      next(error);
    }
  };

  public updateOneTechnique: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id техники');

      const { dto, errors } = await DtoManager.createDto(TechniqueDto, req.body, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const technique = await this.service.getOneTechnique(id);
      if (!technique) throw ApiError.NotFound('Не удалось найти технику');

      const updatedTechnique = await this.service.updateOneTechnique(technique, dto);
      res.send(updatedTechnique);
    } catch (e) {
      next(e);
    }
  };

  public deleteOneTechnique: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id техники');

      const symptom: ITechnique | null = await this.service.getOneTechnique(id);
      if (!symptom) throw ApiError.NotFound('Не удалось найти симптом!');

      const result = await this.service.deleteOneTechnique(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить!');
      res.json({ id });
    } catch (e) {
      next(e);
    }
  };
}
