import { TherapyMethodDto } from '../dto/therapyMethod.dto';
import { TherapyMethodRepository } from '../repositories/therapyMethod.repository';

export class TherapyMethodService {
  private repository: TherapyMethodRepository;

  constructor() {
    this.repository = new TherapyMethodRepository();
  }

  public createTherapyMethod = async (therapyMethodDto: TherapyMethodDto) => {
    return await this.repository.createTherapyMethod(therapyMethodDto);
  };
}
