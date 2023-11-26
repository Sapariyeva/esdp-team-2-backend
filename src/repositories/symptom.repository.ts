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
    const symptom = await this.findOne({ where: { id } });
    if (symptom) await this.remove(symptom);
  }
  async getSymptoms(): Promise<ISymptom[]> {
    return await this.find();
  }
  async getSymptom(id: number): Promise<ISymptom | undefined> {
    const symptom = await this.findOne({ where: { id } });
    if (symptom) return symptom;
    else return undefined;
  }
  async editSymptom(id: number, dto: SymptomDto): Promise<ISymptom | undefined> {
    const existingSymptom = await this.findOneBy({ id });
    if (existingSymptom) {
      this.merge(existingSymptom, dto);
      return await this.save(existingSymptom);
    } else return undefined;
  }
}
