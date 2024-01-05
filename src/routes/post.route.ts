import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import authenticateUser from '../middlewares/authenticateUser';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';
import { PostController } from '../controllers/post.controller';
import { upload } from '../middlewares/ValidateUpload.middlewar';

export class PostRouter implements IRoute {
  public path = '/posts';
  public router = Router();
  private controller: PostController;

  constructor() {
    this.controller = new PostController();
    this.init();
  }

  private init() {
    this.router.post('/create', authenticateUser, checkUserRole('admin'), upload.single('image'), this.controller.createPost);
    this.router.post('/publish/:id', authenticateUser, checkUserRole('admin'), this.controller.publishPost);
    this.router.get('/:id', this.controller.getOnePost);
    this.router.get('/', this.controller.getAllPost);
    this.router.put('/:id/edit', authenticateUser, checkUserRole('admin'), this.controller.editPostText);
    this.router.put('/:id/change-image', authenticateUser, checkUserRole('psychologist'), upload.single('image'), this.controller.editPostImage);
    this.router.delete('/:id', authenticateUser, checkUserRole('admin'), this.controller.deletePost);
  }
}
