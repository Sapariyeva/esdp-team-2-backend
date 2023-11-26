import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Technique } from '../entities/technique.entity';
import { TechniqueDto } from '../dto/technique.dto';
import { ITechnique } from '../interfaces/ITechnique.interface';

export class TechniqueRepository extends Repository<Technique> {
  constructor() {
    super(Technique, appDataSource.createEntityManager());
  }

  public createTechnique = async (TechniqueDto: TechniqueDto) => {
    const technique = this.create({ ...TechniqueDto });
    return await this.save(technique);
  };

  public getAllTechnique = async (): Promise<ITechnique[]> => {
    return await this.find();
  };

  public getOneTechnique = async (id: number) => {
    const technique = await this.findOne({
      where: { id },
    });
    return technique;
  };

  public updateOneTechnique = async (technique: ITechnique) => {
    return await this.save(technique);
  };

  public deleteOneTherapyMethod = async (id: number): Promise<void> => {
    await this.delete(id);
  };
}
