import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Technique } from '../entities/technique.entity';
import { TechniqueDto } from '../dto/technique.dto';
import { ITechnique } from '../interfaces/ITechnique.interface';

export class TechniqueRepository extends Repository<Technique> {
  constructor() {
    super(Technique, appDataSource.createEntityManager());
  }

  public createTechnique = async (TechniqueDto: TechniqueDto): Promise<ITechnique> => {
    const technique = this.create(TechniqueDto);
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

  public updateOneTechnique = async (technique: ITechnique, TechniqueDto: TechniqueDto): Promise<ITechnique | null> => {
    const updatedTechnique = this.merge(technique, TechniqueDto);
    return await this.save(updatedTechnique);
  };

  public deleteOneTechnique = async (id: number) => {
    const deletedTechnique = await this.delete(id);
    if (deletedTechnique.affected) return id;
    return null;
  };
}
