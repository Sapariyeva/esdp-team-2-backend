import { SymptomDto } from '../dto/symptom.dto';
import { ISymptom } from '../interfaces/ISymptom.interface';
import { SymptomRepository } from '../repositories/symptom.repository';

export class SymptomService {
  private repository: SymptomRepository;

  constructor() {
    this.repository = new SymptomRepository();
  }

  getSymptoms = async (): Promise<ISymptom[]> => {
    return await this.repository.getSymptoms();
  };

  createSymptom = async (dto: SymptomDto): Promise<ISymptom> => {
    return await this.repository.createSymptom(dto);
  };

  getSymptom = async (id: number): Promise<ISymptom | null> => {
    return await this.repository.getSymptom(id);
  };
  deleteSymptom = async (id: number) => {
    return await this.repository.deleteSymptom(id);
  };
  editSymptom = async (symptom: ISymptom, dto: SymptomDto) => {
    return await this.repository.editSymptom(symptom, dto);
  };
}
