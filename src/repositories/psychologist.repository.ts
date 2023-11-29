import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
import { PsychologistDto } from '../dto/psychologist.dto';
import { Certificate } from '../entities/certificate.entity';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { Photo } from '../entities/photo.entity';

export class PsychologistRepository extends Repository<Psychologist> {
  constructor() {
    super(Psychologist, appDataSource.createEntityManager());
  }

  public savePsychologist = async (psychologistDto: PsychologistDto, certificateList: string[], photosList: string[]): Promise<IPsychologist> => {
    const certificates = certificateList.map((certificate) => {
      const certificateSchema = new Certificate();
      certificateSchema.sertificate = certificate;
      return certificateSchema;
    });

    const photos = photosList.map((photo) => {
      const photoSchema = new Photo();
      photoSchema.photo = photo;
      return photoSchema;
    });

    const newPsychologist = this.create({
      ...psychologistDto,
      certificates,
      photos,
    });

    return await this.save(newPsychologist);
  };

  public findOnePsychologist = async (where: FindOptionsWhere<Psychologist>): Promise<IPsychologist | null> => {
    return await this.findOne({ where, relations: { city: true } });
  };

  public findPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.find();
  };
  async editPsychologist(id: number, dto: PsychologistDto): Promise<IPsychologist | null> {
    await this.update(id, dto);
    return await this.findOnePsychologist({ id });
  }

  public publishPsychologist = async (id: number): Promise<number | null> => {
    const result = await this.update(id, { isPublish: () => 'NOT isPublish' });
    return result.affected ? id : null;
  };

  public deletePsychologist = async (id: number) => {
    const result = await this.delete(id);
    return result.affected ? id : null;
  };
}
