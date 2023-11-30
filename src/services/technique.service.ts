import { TechniqueDto } from '../dto/technique.dto';
import { ITechnique } from '../interfaces/ITechnique.interface';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';
import { TechniqueRepository } from '../repositories/technique.repository';

export class TechniqueService {
  private repository: TechniqueRepository;

  constructor() {
    this.repository = new TechniqueRepository();
  }

  public createTeqchnique = async (techniqueDto: TechniqueDto) => {
    return await this.repository.createTechnique(techniqueDto);
  };

  public getAllTechnique = async (): Promise<ITherapyMethod[]> => {
    return await this.repository.getAllTechnique();
  };

  public getOneTechnique = async (id: number): Promise<ITherapyMethod | null> => {
    return await this.repository.getOneTechnique(id);
  };

  public updateOneTechnique = async (technique: ITechnique, TechniqueDto: TechniqueDto): Promise<ITechnique | null> => {
    return await this.repository.updateOneTechnique(technique, TechniqueDto);
  };

  public deleteOneTechnique = async (id: number) => {
    return await this.repository.deleteOneTeqcnique(id);
  };
}
