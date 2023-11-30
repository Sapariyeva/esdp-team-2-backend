import { RequestHandler } from 'express';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import { CertificateService } from '../services/certificate.service';
import FileManager from '../helpers/fileManager';
import config from '../config';
import { PsychologistService } from '../services/psychologist.service';

export class CertificateController {
  private service: CertificateService;
  private psychologistService: PsychologistService;

  constructor() {
    this.service = new CertificateService();
    this.psychologistService = new PsychologistService();
  }

  saveCertificate: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();

      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const { id: userId } = req.customLocals.userJwtPayload;
      const psychologist = await this.psychologistService.getOnePsychologist(userId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      const certificate = req.file.filename;
      const psychologistId = psychologist.id;
      const certificateData = { psychologistId, certificate };
      const newCertificate = await this.service.saveCertificate(certificateData);
      res.send(newCertificate);
    } catch (error) {
      req.file ? FileManager.deleteFile(config.uploadPath, req.file.filename) : null;
      next(error);
    }
  };

  deleteCertificate: RequestHandler = async (req, res, next) => {
    try {
      if (!req.customLocals.userJwtPayload || !req.customLocals.userJwtPayload.id) throw ApiError.UnauthorizedError();
      const { id: userId } = req.customLocals.userJwtPayload;

      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const certificate = await this.service.getCertificate(id);
      if (!certificate) throw ApiError.NotFound('Не удалось найти сертификат!');

      if (userId !== certificate.psychologist?.userId) throw ApiError.Forbidden();

      const result = await this.service.deleteCertificate(id);
      if (!result) throw ApiError.BadRequest('Не удалось удалить!');

      const fileName = certificate.certificate;
      FileManager.deleteFile(config.uploadPath, fileName);

      res.send({ id });
    } catch (error) {
      next(error);
    }
  };
}
