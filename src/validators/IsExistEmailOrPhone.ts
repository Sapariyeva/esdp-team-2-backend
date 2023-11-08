import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsExistEmailOrPhone(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsExistEmailOrPhone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: never, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, string>)[relatedPropertyName];
          return value || relatedValue;
        },
      },
    });
  };
}
