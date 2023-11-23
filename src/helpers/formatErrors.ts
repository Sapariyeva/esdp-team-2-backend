import { ValidationError } from 'class-validator';
import { IErrorItem } from './api-error';

interface IFormatErrorsHandler {
  (errors: ValidationError[]): IErrorItem[];
}

export const formatErrors: IFormatErrorsHandler = (errors) => {
  const updatedErrors: IErrorItem[] = [];

  errors.forEach((e) => {
    if (e.constraints) {
      const error = {
        type: e.property,

        messages: Object.values(e.constraints),
      };

      updatedErrors.push(error);
    }
  });

  return updatedErrors;
};
