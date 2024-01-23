import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { CertificateController } from '../controllers/certificate.controller';
import { upload } from '../middlewares/ValidateUpload.middlewar';
import authenticateUser from '../middlewares/authenticateUser';

export class CertificateRouter implements IRoute {
  public path = '/certificates';
  router: Router = Router();
  private controller: CertificateController;

  constructor() {
    this.controller = new CertificateController();
    this.init();
  }
  private init() {
    this.router.post('/create', authenticateUser, upload.single('certificates'), this.controller.saveCertificate);
    this.router.delete('/:id', authenticateUser, this.controller.deleteCertificate);
  }
}
