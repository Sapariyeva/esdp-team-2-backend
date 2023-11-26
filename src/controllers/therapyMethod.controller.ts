import { RequestHandler } from 'express';
import { TherapyMethodService } from '../services/therapyMethod.service';
import { plainToClass } from 'class-transformer';
import { TherapyMethodDto } from '../dto/therapyMethod.dto';

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
}
