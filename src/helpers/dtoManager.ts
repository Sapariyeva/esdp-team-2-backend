import { validate } from 'class-validator';
import { IErrorItem } from './api-error';
import { formatErrors } from './formatErrors';
import { ClassConstructor, plainToInstance } from 'class-transformer';

interface IOptions {
  isValidate: boolean;
}

class DtoManager {
  private static defaultOptions: IOptions = {
    isValidate: false,
  };

  static createDto = async <T extends object, V>(
    cls: ClassConstructor<T>,
    plain: V,
    options?: IOptions,
  ): Promise<{ dto: T; errors: IErrorItem[] }> => {
    const { isValidate }: IOptions = { ...DtoManager.defaultOptions, ...options };

    const dto: T = plainToInstance(cls, plain, { excludeExtraneousValues: true });
    let errors: IErrorItem[] = [];

    if (isValidate) errors = await DtoManager.validateDto(dto);

    return { dto, errors };
  };

  private static validateDto = async (object: object) => {
    const errors = await validate(object, {
      whitelist: true,
      validationError: { target: false, value: false },
    });

    return formatErrors(errors);
  };
}

export default DtoManager;
