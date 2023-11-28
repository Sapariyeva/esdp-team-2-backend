import { plainToInstance } from 'class-transformer';
import { PsychologistDto } from '../dto/psychologist.dto';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { validate } from 'class-validator';
import { IErrorItem } from '../helpers/api-error';
import { formatErrors } from '../helpers/formatErrors';

interface IGetPsychologistDto {
  (data: unknown, options: { isValidate: boolean }): Promise<{ psychologistDto: PsychologistDto; errors: IErrorItem[] }>;
}

export class PsychologistService {
  private repository: PsychologistRepository;

  constructor() {
    this.repository = new PsychologistRepository();
  }

  // public createPsychologist = async (psychologistDto: PsychologistDto, certificateList: string[]): Promise<IPsychologist | null> => {
  //   const { id } = await this.repository.savePsychologist(psychologistDto, certificateList);

  //   return await this.repository.findOnePsychologist({ id });
  // };

  public getOnePsychologist = async (id: number): Promise<IPsychologist | null> => {
    return await this.repository.findOnePsychologist({ id });
  };

  public getPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.repository.findPsychologists();
  };

  public getPsychologistDto: IGetPsychologistDto = async (data, options = { isValidate: false }) => {
    const psychologistDto: PsychologistDto = plainToInstance(PsychologistDto, data, { excludeExtraneousValues: true });
    let errors: IErrorItem[] = [];

    if (options.isValidate) {
      const errorsRaw = await validate(psychologistDto, {
        whitelist: true,
        validationError: { target: false, value: false },
      });

      errors = formatErrors(errorsRaw);
    }

    return { psychologistDto, errors };
  };

  public isPsychologistCreatable = async (userId: number): Promise<boolean> => {
    const psychologist = await this.repository.findOnePsychologist({ userId });

    if (psychologist) return false;
    return true;
  };
}
