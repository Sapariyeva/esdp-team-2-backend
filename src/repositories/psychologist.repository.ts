import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
import { Certificate } from '../entities/certificate.entity';
import { IPsychologistNewData, IPsychologist } from '../interfaces/IPsychologist.interface';
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
}
