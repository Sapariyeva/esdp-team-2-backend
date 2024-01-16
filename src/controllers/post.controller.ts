import { RequestHandler } from 'express';
import { PostService } from '../services/post.service';
import FileManager from '../helpers/fileManager';
import config from '../config';
import { ApiError } from '../helpers/api-error';
import validateNumber from '../helpers/validateNumber';
import { IPost } from '../interfaces/IPost.interface';
import { UserRole } from 'src/interfaces/UserRole.enum';

export class PostController {
  private service: PostService = new PostService();

  createPost: RequestHandler = async (req, res, next) => {
    try {
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
      let isAdmin: boolean = false;
      if (req.customLocals.userJwtPayload && req.customLocals.userJwtPayload.role === UserRole.Admin) isAdmin = true;

      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const post = isAdmin ? await this.service.getOnePostByAdmin(id) : await this.service.getOnePost(id);
      if (!post) throw ApiError.NotFound('Такого поста нет!');

      res.send(post);
    } catch (e) {
      next(e);
    }
  };

  getAllPost: RequestHandler = async (req, res, next) => {
    try {
      let isAdmin: boolean = false;
      if (req.customLocals.userJwtPayload && req.customLocals.userJwtPayload.role === UserRole.Admin) isAdmin = true;

      const posts = isAdmin ? await this.service.getAllPostByAdmin() : await this.service.getAllPost();

      res.send(posts);
    } catch (e) {
      next(e);
    }
  };

  editPostText: RequestHandler = async (req, res, next) => {
    try {
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
      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const postId = validateNumber(req.params.id);
      if (!postId) throw ApiError.BadRequest('Не верно указан id');

      const image = req.file.filename;
      const dto = { image };

      const oldPost = await this.service.getOnePostByAdmin(postId);
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

      const post: IPost | null = await this.service.getOnePostByAdmin(id);
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
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const post = await this.service.getOnePostByAdmin(id);
      if (!post) throw ApiError.NotFound('Не удалось найти пост!');

      const fileName = post.image;
      if (fileName) FileManager.deleteFile(config.uploadPath, fileName);

      const result = await this.service.deletePost(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить пост!');

      res.send({ message: `Пост с идентификатором ${id} успешно удалён.` });
    } catch (e) {
      next(e);
    }
  };
}
