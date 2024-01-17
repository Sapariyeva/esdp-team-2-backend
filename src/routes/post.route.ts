import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import authenticateUser from '../middlewares/authenticateUser';
import { checkUserRole } from '../middlewares/checkUserRole.middleware';
import { PostController } from '../controllers/post.controller';
import { upload } from '../middlewares/ValidateUpload.middlewar';
import { UserRole } from '../interfaces/UserRole.enum';

export class PostRouter implements IRoute {
  public path = '/posts';
  public router = Router();
  private controller: PostController;

  constructor() {
    this.controller = new PostController();
    this.init();
  }

  private init() {
    this.router.post('/create', authenticateUser, checkUserRole(UserRole.Admin), upload.single('image'), this.controller.createPost);
    this.router.post('/publish/:id', authenticateUser, checkUserRole(UserRole.Admin), this.controller.publishPost);
    this.router.get('/:id', this.controller.getOnePost);
    this.router.get('/', this.controller.getAllPost);
    this.router.put('/:id/edit', authenticateUser, checkUserRole(UserRole.Admin), this.controller.editPostText);
    this.router.put('/:id/change-image', authenticateUser, checkUserRole(UserRole.Admin), upload.single('image'), this.controller.editPostImage);
    this.router.delete('/:id', authenticateUser, checkUserRole(UserRole.Admin), this.controller.deletePost);
  }
}
