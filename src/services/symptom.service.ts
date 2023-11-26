import { plainToInstance } from 'class-transformer';
import { SymptomDto } from '../dto/symptom.dto';
import { ISymptom } from '../interfaces/ISymptom.interface';
import { SymptomRepository } from '../repositories/symptom.repository';
import { IErrorItem } from '../helpers/api-error';
import { validate } from 'class-validator';
import { formatErrors } from '../helpers/formatErrors';

export class SymptomService {
  private repository: SymptomRepository;

  constructor() {
    this.repository = new SymptomRepository();
  }

  getSymptoms = async (): Promise<ISymptom[]> => {
    return await this.repository.getSymptoms();
  };

  createSymptom = async (dto: SymptomDto): Promise<ISymptom> => {
    return await this.repository.createSymptom(dto);
  };

  getSymptom = async (id: number): Promise<ISymptom | undefined> => {
    return await this.repository.getSymptom(id);
  };
  deleteSymptom = async (id: number) => {
    return await this.repository.deleteSymptom(id);
  };
  editSymptom = async (id: number, dto: SymptomDto) => {
    return await this.repository.editSymptom(id, dto);
  };

  getSymptomDto = async (data: unknown, options: { isValidate: boolean }) => {
    const symptomDto: SymptomDto = plainToInstance(SymptomDto, data, { excludeExtraneousValues: true });
    let errors: IErrorItem[] = [];

    if (options.isValidate) {
      const errorsRaw = await validate(symptomDto, {
        whitelist: true,
        validationError: { target: false, value: false },
      });

      errors = formatErrors(errorsRaw);
    }

    return { symptomDto, errors };
  };
}
