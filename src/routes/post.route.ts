import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
// import { upload } from '../middlewares/ValidateUpload.middlewar';
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
    this.router.post('/create', authenticateUser, checkUserRole('psychologist'), upload.single('image'), this.controller.createPost);
  }
}
