import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { ApiError } from '../helpers/api-error';
import { validate } from 'class-validator';
import { PsychologistService } from '../services/psychologist.service';
import { formatErrors } from '../helpers/formatErrors';
import { IUserTokenData } from '../interfaces/IUser.interface';
import config from '../config';
import jwt from 'jsonwebtoken';
import { PsychologistDto } from '../dto/psychologist.dto';
import FileManager from '../helpers/fileManager';

export class PsychologistController {
  private service: PsychologistService;

  constructor() {
    this.service = new PsychologistService();
  }

  createPsychologistHandler: RequestHandler = async (req, res, next) => {
    try {
      const accessToken = req.header('Authorization');
      if (!accessToken) throw ApiError.UnauthorizedError();

      const userTokenData = jwt.verify(accessToken, config.secretKey) as IUserTokenData;
      if (!userTokenData) throw ApiError.UnauthorizedError();

      if (!req.files || Array.isArray(req.files)) throw ApiError.BadRequest('Ошибка при обрабке изображений');

      const photoFileName = req.files.photo[0].filename;
      const certificatesFileNames = req.files.certificates.map((file) => file.filename);

      const content = { ...req.body, userId: userTokenData.id, photo: photoFileName };

      const psychologistDto = plainToInstance(PsychologistDto, content, { excludeExtraneousValues: true });
      await this.validateDto(psychologistDto);

      const psychologistData = await this.service.createPsychologist(psychologistDto, certificatesFileNames);
      if (!psychologistData) throw ApiError.BadRequest('Психолог на этом пользователе уже существует');

      res.send(psychologistData);
    } catch (e) {
      FileManager.deleteFiles(config.uploadPath, req.files);
      next(e);
    }
  };

  private async validateDto(dto: PsychologistDto) {
    const errors = await validate(dto, {
      whitelist: true,
      validationError: { target: false, value: false },
    });
    if (errors.length) throw ApiError.BadRequest('Ошибка при валидации формы', formatErrors(errors));
  }
}
