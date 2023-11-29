import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { ICertificate } from '../interfaces/ICertificate.interface';
import { Certificate } from '../entities/certificate.entity';
import { CertificateDto } from '../dto/certificate.dto';

export class CertificateRepository extends Repository<ICertificate> {
  constructor() {
    super(Certificate, appDataSource.createEntityManager());
  }
  async saveCertificate(dto: CertificateDto): Promise<ICertificate> {
    const certificate = this.create(dto);
    return await this.save(certificate);
  }
  async deleteCertificate(id: number) {
    const deletedCertificate = await this.delete(id);
    if (deletedCertificate.affected) return id;
    return null;
  }
  async getCertificates(): Promise<ICertificate[]> {
    return await this.find();
  }
  async getCertificate(id: number): Promise<ICertificate | null> {
    return await this.findOne({ where: { id } });
  }
}
