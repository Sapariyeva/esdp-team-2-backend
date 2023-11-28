import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { upload } from '../middlewares/ValidateUpload.middlewar';
import authenticateUser from '../middlewares/authenticateUser';
import { PhotoController } from '../controllers/photo.controller';

export class PhotoRouter implements IRoute {
  public path = '/photos';
  public router = Router();
  private controller: PhotoController;

  constructor() {
    this.controller = new PhotoController();
    this.init();
  }

  private init() {
    this.router.post('/create', authenticateUser, upload.single('photo'), this.controller.createPhoto);
    this.router.delete('/:id', this.controller.deletePhoto);
  }
}
