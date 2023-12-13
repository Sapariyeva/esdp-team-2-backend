import { RequestHandler } from 'express';
import { PostService } from '../services/post.service';
import FileManager from '../helpers/fileManager';
import config from '../config';
import { PsychologistService } from '../services/psychologist.service';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';

export class PostController {
  private service: PostService = new PostService();
  private servicePsychologist = new PsychologistService();

  createPost: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.servicePsychologist.getOnePsychologistByUserId(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const psychologistId = psychologist.id;
      const image = req.file.filename;
      const description = req.body.description;
      const title = req.body.title;
      const dto = { psychologistId, image, description, title };
      const newPost = await this.service.createPost(dto);
      res.send(newPost);
    } catch (e) {
      req.file ? FileManager.deleteFile(config.uploadPath, req.file.filename) : null;
      next(e);
    }
  };

  getOnePost: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const post = await this.service.getOnePost(id);
      if (!post) throw ApiError.NotFound('Такого поста нет!');

      res.send(post);
    } catch (e) {
      next(e);
    }
  };
}
