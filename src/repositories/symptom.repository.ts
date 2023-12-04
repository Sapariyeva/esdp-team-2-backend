import { In, Repository } from 'typeorm';
import { ISymptom } from '../interfaces/ISymptom.interface';
import { Symptom } from '../entities/symptom.entity';
import { appDataSource } from '../config/dataSource';
import { SymptomDto } from '../dto/symptom.dto';

export class SymptomRepository extends Repository<Symptom> {
  constructor() {
    super(Symptom, appDataSource.createEntityManager());
  }

  createSymptom = async (dto: SymptomDto): Promise<ISymptom> => {
    const symptom = this.create(dto);
    return await this.save(symptom);
  };

  deleteSymptom = async (id: number) => {
    const deletedSymptom = await this.delete(id);
    if (deletedSymptom.affected) return id;
    return null;
  };

  getSymptoms = async (): Promise<ISymptom[]> => {
    return await this.find();
  };

  getAllSymptomById = async (ids: number[]): Promise<ISymptom[]> => {
    return await this.findBy({ id: In(ids) });
  };

  getSymptom = async (id: number): Promise<ISymptom | null> => {
    return await this.findOne({ where: { id } });
  };

  editSymptom = async (symptom: ISymptom, dto: SymptomDto): Promise<ISymptom | null> => {
    const updatedSymptom = this.merge(symptom, dto);
    return await this.save(updatedSymptom);
  };
}
