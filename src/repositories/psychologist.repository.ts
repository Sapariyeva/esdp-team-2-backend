import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
// import { PsychologistDto } from '../dto/psychologist.dto';
// import { Certificate } from '../entities/certificate.entity';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

export class PsychologistRepository extends Repository<Psychologist> {
  constructor() {
    super(Psychologist, appDataSource.createEntityManager());
  }

  // public savePsychologist = async (psychologistDto: PsychologistDto, certificateList: string[]) => {
  //   const certificates = certificateList.map((certificate) => {
  //     const certificateSchema = new Certificate();
  //     certificateSchema.sertificate = certificate;

  //     return certificateSchema;
  //   });

  //   const newPsychologist = this.create({ ...psychologistDto, certificates });

  //   return await this.save(newPsychologist);
  // };

  public findOnePsychologist = async (where: FindOptionsWhere<Psychologist>): Promise<IPsychologist | null> => {
    return await this.findOne({ where });
  };

  public findPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.find();
  };
}
