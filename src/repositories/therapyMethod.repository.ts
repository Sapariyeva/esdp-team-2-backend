import { Repository } from 'typeorm';
import { TherapyMethod } from '../entities/therapyMethod.entity';
import { appDataSource } from '../config/dataSource';
import { TherapyMethodDto } from '../dto/therapyMethod.dto';

export class TherapyMethodRepository extends Repository<TherapyMethod> {
  constructor() {
    super(TherapyMethod, appDataSource.createEntityManager());
  }

  public createTherapyMethod = async (therapyMethodDto: TherapyMethodDto) => {
    return await this.save(therapyMethodDto);
  };
}
