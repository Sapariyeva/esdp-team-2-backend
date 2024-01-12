import { CertificateDto } from '../dto/certificate.dto';
import { ICertificate } from '../interfaces/ICertificate.interface';
import { CertificateRepository } from '../repositories/certificate.repository';

export class CertificateService {
  private repository: CertificateRepository;

  constructor() {
    this.repository = new CertificateRepository();
  }

  getCertificates = async (): Promise<ICertificate[]> => {
    return await this.repository.getCertificates();
  };

  getCertificate = async (id: number): Promise<ICertificate | null> => {
    return await this.repository.getCertificate(id);
  };

  saveCertificate = async (dto: CertificateDto): Promise<ICertificate> => {
    return await this.repository.saveCertificate(dto);
  };

  deleteCertificate = async (id: number) => {
    return await this.repository.deleteCertificate(id);
  };
}
