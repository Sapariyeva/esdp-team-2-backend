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
    const therapyMethod = this.create({ ...therapyMethodDto });
    return await this.save(therapyMethod);
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

  public updateOneTherapyMethod = async (updatedTherapyMethod: ITherapyMethod) => {
    return await this.save(updatedTherapyMethod);
  };

  public deleteOneTherapyMethod = async (id: number): Promise<void> => {
    await this.delete(id);
  };
}
