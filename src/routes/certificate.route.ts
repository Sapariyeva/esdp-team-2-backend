import { Router } from 'express';
import { IRoute } from '../interfaces/IRoute.interface';
import { CertificateController } from '../controllers/certificate.controller';
import { upload } from '../middlewares/ValidateUpload.middlewar';

export class CertificateRouter implements IRoute {
  public path = '/certificates';
  router: Router = Router();
  private controller: CertificateController;

  constructor() {
    this.controller = new CertificateController();
    this.init();
  }
  private init() {
    this.router.post('/create', upload.single('certificate'), this.controller.saveCertificate);
    this.router.delete('/:id', this.controller.deleteCertificate);
    this.router.get('/', this.controller.getCertificates);
  }
}
