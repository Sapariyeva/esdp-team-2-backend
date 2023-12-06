import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
import { Certificate } from '../entities/certificate.entity';
import { IPsychologistNewData, IPsychologist, IPsychologistFilters } from '../interfaces/IPsychologist.interface';
import { Photo } from '../entities/photo.entity';

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

  public filterPsychologists = async (filters: IPsychologistFilters): Promise<IPsychologist[] | null> => {
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
      queryBuilder
        .andWhere('psychologistTherapyMethod.therapyMethodId IN (:...therapyMethodIds)', {
          therapyMethodIds: filters.therapyMethodIds,
        })
        .leftJoin('psychologist.therapyMethods', 'psychologistTherapyMethod');
    }

    if (filters.techniqueIds && filters.techniqueIds.length > 0) {
      queryBuilder
        .andWhere('psychologistTechnique.techniqueId IN (:...techniqueIds)', {
          techniqueIds: filters.techniqueIds,
        })
        .leftJoin('psychologist.techniques', 'psychologistTechnique');
    }

    if (filters.symptomIds && filters.symptomIds.length > 0) {
      queryBuilder
        .andWhere('psychologistSymptom.symptomId IN (:...symptomIds)', {
          symptomIds: filters.symptomIds,
        })
        .leftJoin('psychologist.symptoms', 'psychologistSymptom');
    }

    const psychologists = await queryBuilder.getMany();
    return psychologists;
  };
}
