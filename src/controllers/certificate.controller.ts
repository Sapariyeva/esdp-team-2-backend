import { RequestHandler } from 'express';
import validateNumber from '../helpers/validateNumber';
import { ApiError } from '../helpers/api-error';
import DtoManager from '../helpers/dtoManager';
import { CertificateService } from '../services/certificate.service';
import { CertificateDto } from '../dto/certificate.dto';
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

  getCertificates: RequestHandler = async (req, res, next) => {
    try {
      res.send(await this.service.getCertificates());
    } catch (error) {
      next(error);
    }
  };

  saveCertificate: RequestHandler = async (req, res, next) => {
    try {
      const psychologistId = req.body.psychologistId;
      const psychologist = await this.psychologistService.getOnePsychologist(psychologistId);
      if (!psychologist) throw ApiError.NotFound('Не удалось найти психолога!');

      if (!req.file) throw ApiError.BadRequest('Ошибка при обработке изображения');

      const certificate = req.file.filename;
      const certificateData = { ...req.body, certificate };
      const { dto, errors } = await DtoManager.createDto(CertificateDto, certificateData, { isValidate: true });
      if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', errors);

      const newCertificate = await this.service.saveCertificate(dto);
      if (!newCertificate) throw ApiError.BadRequest('Не удалось сохранить сертификат!');

      res.send(newCertificate);
    } catch (error) {
      req.file ? FileManager.deleteFile(config.uploadPath, req.file.filename) : null;
      next(error);
    }
  };

  deleteCertificate: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const certificate = await this.service.getCertificate(id);
      if (!certificate) throw ApiError.NotFound('Не удалось найти сертификат!');

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
