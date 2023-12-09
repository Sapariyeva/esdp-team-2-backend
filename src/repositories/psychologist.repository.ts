import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
import { Certificate } from '../entities/certificate.entity';
import { IPsychologistNewData, IPsychologist } from '../interfaces/IPsychologist.interface';
import { Photo } from '../entities/photo.entity';
import { FiltersOfPsychologistDto } from '../dto/filtersOfPsychologist.dto';

export class PsychologistRepository extends Repository<Psychologist> {
  constructor() {
    super(Psychologist, appDataSource.createEntityManager());
  }

  public savePsychologist = async (
    psychologistNewData: IPsychologistNewData,
    certificateList: string[],
    photosList: string[],
  ): Promise<IPsychologist> => {
    const certificates = certificateList.map((certificate) => {
      const certificateSchema = new Certificate();
      certificateSchema.certificate = certificate;
      return certificateSchema;
    });

    const photos = photosList.map((photo) => {
      const photoSchema = new Photo();
      photoSchema.photo = photo;
      return photoSchema;
    });

    const psychologistEntity = this.create({ ...psychologistNewData, certificates, photos });
    return await this.save(psychologistEntity);
  };

  public findOnePsychologist = async (where: FindOptionsWhere<Psychologist>): Promise<IPsychologist | null> => {
    return await this.findOne({ where, relations: { city: true } });
  };

  public findPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.find();
  };

  public editPsychologist = async (id: number, psychologistNewData: IPsychologistNewData): Promise<IPsychologist> => {
    return await this.save({ ...psychologistNewData, id });
  };

  public publishPsychologist = async (id: number): Promise<number | null> => {
    const result = await this.update(id, { isPublish: () => 'NOT isPublish' });
    return result.affected ? id : null;
  };

  public deletePsychologist = async (id: number): Promise<number | null> => {
    const result = await this.delete(id);
    return result.affected ? id : null;
  };

  public filterPsychologists = async (filters: FiltersOfPsychologistDto): Promise<IPsychologist[] | null> => {
    const queryBuilder = this.createQueryBuilder('psychologist');

    if (filters.cityId) {
      queryBuilder.andWhere('psychologist.cityId = :cityId', { cityId: filters.cityId });
    }

    if (filters.gender) {
      queryBuilder.andWhere('psychologist.gender = :gender', { gender: filters.gender });
    }

    if (filters.languages) {
      queryBuilder.andWhere('psychologist.languages = :languages', { languages: filters.languages });
    }

    if (filters.format) {
      queryBuilder.andWhere('psychologist.format = :format', { format: filters.format });
    }

    if (filters.cost !== undefined) {
      queryBuilder.andWhere('psychologist.cost <= :cost', { cost: filters.cost });
    }

    if (filters.therapyMethodIds && filters.therapyMethodIds.length > 0) {
      const therapyMethodIds = filters.therapyMethodIds;
      queryBuilder
        .innerJoin('psychologist.therapyMethods', 'therapy_method', 'therapy_method.id IN (:...therapyMethodIds)', { therapyMethodIds })
        .getMany();
    }

    if (filters.techniqueIds && filters.techniqueIds.length > 0) {
      const techniqueIds = filters.techniqueIds;
      queryBuilder.innerJoin('psychologist.techniques', 'technique', 'technique.id IN (:...techniqueIds)', { techniqueIds }).getMany();
    }

    if (filters.symptomIds && filters.symptomIds.length > 0) {
      const symptomIds = filters.symptomIds;
      queryBuilder.innerJoin('psychologist.symptoms', 'symptoms', 'symptoms.id IN (:...symptomIds)', { symptomIds }).getMany();
    }

    if (filters.age !== undefined) {
      if (typeof filters.age === 'number') {
        const birthDateLimit = new Date();
        birthDateLimit.setFullYear(birthDateLimit.getFullYear() - filters.age);
        queryBuilder.andWhere('psychologist.birthday <= :birthDateLimit', { birthDateLimit });
      } else if (Array.isArray(filters.age) && filters.age.length === 2) {
        const [minAge, maxAge] = filters.age;
        const birthDateMinLimit = new Date();
        birthDateMinLimit.setFullYear(birthDateMinLimit.getFullYear() - minAge);

        const birthDateMaxLimit = new Date();
        birthDateMaxLimit.setFullYear(birthDateMaxLimit.getFullYear() - maxAge);

        queryBuilder.andWhere('psychologist.birthday <= :birthDateMinLimit', { birthDateMinLimit });
        queryBuilder.andWhere('psychologist.birthday >= :birthDateMaxLimit', { birthDateMaxLimit });
      }
    }

    return await queryBuilder.getMany();
  };
}
