import { ValidationError } from 'class-validator';

export const formatErrors = (errors: ValidationError[]) => {
  const updatedErrors: { type: string; messages: string[] }[] = [];

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
