import { Repository } from 'typeorm';
import { TherapyMethod } from '../entities/therapyMethod.entity';
import { appDataSource } from '../config/dataSource';
import { TherapyMethodDto } from '../dto/therapyMethod.dto';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';

export class TherapyMethodRepository extends Repository<TherapyMethod> {
  constructor() {
    super(TherapyMethod, appDataSource.createEntityManager());
  }

  public createTherapyMethod = async (therapyMethodDto: TherapyMethodDto) => {
    return await this.save(therapyMethodDto);
  };

  public getAllTherapyMethod = async (): Promise<ITherapyMethod[]> => {
    return await this.find();
  };

  public getOneTherapyMethod = async (id: number) => {
    const therapyMethod = await this.findOne({
      where: { id },
    });
    return therapyMethod;
  };

  public updateOneTherapyMethod = async (id: number, updatedData: Partial<TherapyMethodDto>) => {
    const therapyMethod = await this.findOne({
      where: { id },
    });
    if (therapyMethod) {
      const updatedTherapyMethod = await this.update(id, updatedData);
      return updatedTherapyMethod;
    } else {
      throw new Error(`Therapy method with ID ${id} not found.`);
    }
  };

  public deleteOneTherapyMethod = async (id: number): Promise<void> => {
    await this.delete(id);
  };
}
