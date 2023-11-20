import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Psychologist } from '../entities/psychologist.entity';
import { PsychologistDto } from '../dto/psychologist.dto';
import { Certificate } from '../entities/certificate.entity';

export class PsychologistRepository extends Repository<Psychologist> {
  constructor() {
    super(Psychologist, appDataSource.createEntityManager());
  }

  async createPsychologist(psychologistDto: PsychologistDto, certificates: string[]) {
    const userExists = await this.getPsychologistByUserId(psychologistDto.userId);
    if (userExists) return null;

    const certificateList = certificates.map((certificate) => {
      const certificateSchema = new Certificate();
      certificateSchema.sertificate = certificate;

      return certificateSchema;
    });

    const newPsychologist = this.create({
      ...psychologistDto,
      certificates: certificateList,
    });

    const { id } = await this.save(newPsychologist);

    return await this.getPsychologistById(id);
  }

  async getPsychologistByUserId(userId: number) {
    return await this.findOne({ where: { userId } });
  }

  async getPsychologistById(id: number) {
    return await this.findOne({ where: { id } });
  }
}
