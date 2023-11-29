import { Repository } from 'typeorm';
import { ISymptom } from '../interfaces/ISymptom.interface';
import { Symptom } from '../entities/symptom.entity';
import { appDataSource } from '../config/dataSource';
import { SymptomDto } from '../dto/symptom.dto';

export class SymptomRepository extends Repository<ISymptom> {
  constructor() {
    super(Symptom, appDataSource.createEntityManager());
  }
  async createSymptom(dto: SymptomDto): Promise<ISymptom> {
    const symptom = this.create(dto);
    return await this.save(symptom);
  }
  async deleteSymptom(id: number) {
    const deletedSymptom = await this.delete(id);
    if (deletedSymptom.affected) return id;
    return null;
  }
  async getSymptoms(): Promise<ISymptom[]> {
    return await this.find();
  }
  async getSymptom(id: number): Promise<ISymptom | null> {
    return await this.findOne({ where: { id } });
  }
  async editSymptom(symptom: ISymptom, dto: SymptomDto): Promise<ISymptom | null> {
    const updatedSymptom = this.merge(symptom, dto);
    return await this.save(updatedSymptom);
  }
}
