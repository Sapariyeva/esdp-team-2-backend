import { RequestHandler } from 'express';
import { PhotoService } from '../services/photo.service';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';

export class PhotoController {
  private service: PhotoService;

  constructor() {
    this.service = new PhotoService();
  }

  public createPhoto: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const userId = req.customLocals.userJwtPayload.id;

      const psychologist = await this.service.findOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Такого психолога не существует');

      const photoName = req.file?.filename;
      if (!photoName) throw ApiError.BadRequest('Не удалось получить имя файла фотографии');

      const photo = await this.service.createPhoto(psychologist.id, photoName);
      res.send(photo);
    } catch (e) {
      next(e);
    }
  };

  public deletePhoto: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id фотографии');

      const userId = req.customLocals.userJwtPayload.id;
      const psychologist = await this.service.findOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Такого психолога не существует');

      const selectedPhoto = await this.service.getOnePhoto(id);
      if (psychologist.id !== selectedPhoto?.psychologistId) throw ApiError.Forbidden();

      const deletePhoto = await this.service.deletePhoto(id);
      if (!deletePhoto) throw ApiError.BadRequest('Не получилось удалить фотографию');
      res.json({ id });
    } catch (e) {
      next(e);
    }
  };
}
