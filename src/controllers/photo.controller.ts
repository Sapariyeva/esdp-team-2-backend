import { RequestHandler } from 'express';
import { PhotoService } from '../services/photo.service';
import { PhotoDto } from '../dto/photo.dto';
import DtoManager from '../helpers/dtoManager';
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
      if (!userId) throw ApiError.BadRequest('Не верно указан id пользователя');

      const { dto } = await DtoManager.createDto(PhotoDto, req.body, { isValidate: true });

      const psychologist = await this.service.findOnePsychologist(userId);
      if (!psychologist) throw ApiError.BadRequest('Не верно указан id психолога');

      dto.psychologistId = psychologist.id;

      if (req.file) dto.photo = req.file.filename;

      const photo = await this.service.createPhoto(dto);

      res.send(photo);
    } catch (e) {
      next(e);
    }
  };

  public deletePhoto: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id фотографии');
      await this.service.deletePhoto(id);
      res.json({ id });
    } catch (e) {
      next(e);
    }
  };
}
