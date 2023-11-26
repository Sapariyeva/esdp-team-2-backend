import { RequestHandler } from 'express';
import { TherapyMethodService } from '../services/therapyMethod.service';
import { plainToClass } from 'class-transformer';
import { TherapyMethodDto } from '../dto/therapyMethod.dto';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';

export class TherapyMethodController {
  private service: TherapyMethodService;

  constructor() {
    this.service = new TherapyMethodService();
  }

  public createTherapyMethod: RequestHandler = async (req, res, next) => {
    const therapyMethodDto = plainToClass(TherapyMethodDto, req.body);
    try {
      const therapyMethod = await this.service.createTherapyMethod(therapyMethodDto);
      res.send(therapyMethod);
    } catch (e) {
      next(e);
    }
  };

  public getAllTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      const therapyMethod: ITherapyMethod[] = await this.service.getAllTherapyMethod();
      res.send(therapyMethod);
    } catch (e) {
      next(e);
    }
  };

  public getOneTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const therapyMethod = await this.service.getOneTherapyMethod(Number(id));
      if (therapyMethod) {
        res.send(therapyMethod);
      } else {
        res.status(400).send({ message: `Метод терапии с таким id:${id} не найден` });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateOneTherapyMethod: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const therapyMethod = await this.service.updateOneTherapyMethod(Number(id), updatedData);
      if (therapyMethod) {
        res.status(200).send({ message: 'Метод терапии обновлен' });
      }
    } catch (e) {
      next(e);
    }
  };
}
