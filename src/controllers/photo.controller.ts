import { RequestHandler } from 'express';
import { PhotoService } from '../services/photo.service';
import { ApiError } from '../helpers/api-error';

export class PhotoController {
  private service: PhotoService;

  constructor() {
    this.service = new PhotoService();
  }

  public createPhoto: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      if (!req.files || Array.isArray(req.files)) throw ApiError.BadRequest('Ошибка при обработке изображений');
      const { id: userId } = req.customLocals.userJwtPayload;
      const photo: string = req.files.photo[0].filename;
      const psychologistRawData = { ...req.body, userId, photo };
      await this.service.createPhoto(psychologistRawData);
    } catch (e) {
      next(e);
    }
  };
}
