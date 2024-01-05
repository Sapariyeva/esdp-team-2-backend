import { RequestHandler } from 'express';
import { PostService } from '../services/post.service';
import FileManager from '../helpers/fileManager';
import config from '../config';
import { PsychologistService } from '../services/psychologist.service';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { IPost } from '../interfaces/IPost.interface';

export class PostController {
  private service: PostService = new PostService();
  private servicePsychologist = new PsychologistService();

  createPost: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const image = req.file.filename;
      const description = req.body.description;
      const title = req.body.title;
      const dto = { image, description, title };
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

  getAllPost: RequestHandler = async (req, res, next) => {
    try {
      res.send(await this.service.getAllPost());
    } catch (e) {
      next(e);
    }
  };

  editPostText: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      const postId = validateNumber(req.params.id);
      if (!postId) throw ApiError.BadRequest('Не верно указан id');

      const { title, description } = req.body;
      const postRawData = { title, description };

      const updatedPost = await this.service.editPostText(postRawData, postId);
      if (!updatedPost) throw ApiError.BadRequest('Не удалось изменить пост!');

      res.send(updatedPost);
    } catch (e) {
      next(e);
    }
  };

  editPostImage: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const postId = validateNumber(req.params.id);
      if (!postId) throw ApiError.BadRequest('Не верно указан id');

      const psychologist = await this.servicePsychologist.getOnePsychologistByUserId(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      // const postBelongsToPsychologist = await this.service.checkPostBelongsToPsychologist(postId, psychologist.id);
      // if (!postBelongsToPsychologist) throw ApiError.Forbidden();

      const psychologistId = psychologist.id;
      const image = req.file.filename;

      const dto = { psychologistId, image };

      const oldPost = await this.service.getOnePost(postId);
      if (!oldPost) throw ApiError.NotFound('Не удалось найти старый пост!');

      const oldImage = oldPost.image;

      const updatedPostImage = await this.service.editPostImage(dto, postId);
      if (!updatedPostImage) throw ApiError.BadRequest('Не удалось изменить фото!');

      if (oldImage) FileManager.deleteFile(config.uploadPath, oldImage);

      res.send(updatedPostImage);
    } catch (e) {
      req.file ? FileManager.deleteFile(config.uploadPath, req.file.filename) : null;
      next(e);
    }
  };

  publishPost: RequestHandler = async (req, res, next) => {
    try {
      const id: number | null = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id поста');

      const post: IPost | null = await this.service.getOnePost(id);
      if (!post) throw ApiError.NotFound('Не удалось найти пост!');

      const result = await this.service.publishPost(id);
      if (!result) throw ApiError.BadRequest('Не удалось опубликовать пост!');

      res.send({ message: `Пост с идентификатором ${id} успешно добавлен.` });
    } catch (e) {
      next(e);
    }
  };

  deletePost: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const psychologist = await this.servicePsychologist.getOnePsychologistByUserId(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      // const postBelongsToPsychologist = await this.service.checkPostBelongsToPsychologist(id, psychologist.id);
      // if (!postBelongsToPsychologist) throw ApiError.Forbidden();

      const deleteImage = await this.service.getOnePost(id);
      if (!deleteImage) throw ApiError.NotFound('Не удалось найти пост!');

      const fileName = deleteImage.image;
      if (fileName) FileManager.deleteFile(config.uploadPath, fileName);

      const result = await this.service.deletePost(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить пост!');

      res.send({ message: `Пост с идентификатором ${id} успешно удалён.` });
    } catch (e) {
      next(e);
    }
  };
}
