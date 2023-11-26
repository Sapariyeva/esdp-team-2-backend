import { TherapyMethodDto } from '../dto/therapyMethod.dto';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';
import { TherapyMethodRepository } from '../repositories/therapyMethod.repository';

export class TherapyMethodService {
  private repository: TherapyMethodRepository;

  constructor() {
    this.repository = new TherapyMethodRepository();
  }

  public createTherapyMethod = async (therapyMethodDto: TherapyMethodDto) => {
    return await this.repository.createTherapyMethod(therapyMethodDto);
  };
  public getAllTherapyMethod = async (): Promise<ITherapyMethod[]> => {
    return await this.repository.getAllTherapyMethod();
  };

  public getOneTherapyMethod = async (id: number): Promise<ITherapyMethod | null> => {
    return await this.repository.getOneTherapyMethod(id);
  };
}
