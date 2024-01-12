import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     AuthUserDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: jane.doe@example.com
 *         phone:
 *           type: string
 *           pattern: '^\+?[1-9]\d{1,14}$'  # Adjust the pattern based on your phone number requirements
 *           example: 87777777777
 *         password:
 *           type: string
 *           example: 123123
 *         role:
 *           type: string
 *           enum:
 *             - patient
 *             - psychologist
 *           example: patient
 *
 *     RegisterUserInput:
 *       type: object
 *       required:
 *         - password
 *         - role
 *       properties:
 *         email:
 *           $ref: '#/components/schemas/AuthUserDto/properties/email'
 *         phone:
 *           $ref: '#/components/schemas/AuthUserDto/properties/phone'
 *         password:
 *           $ref: '#/components/schemas/AuthUserDto/properties/password'
 *         role:
 *           $ref: '#/components/schemas/AuthUserDto/properties/role'
 *
 *     RegisterUserResponse:
 *       type: object
 *       properties:
 *         email:
 *           $ref: '#/components/schemas/AuthUserDto/properties/email'
 *         phone:
 *           $ref: '#/components/schemas/AuthUserDto/properties/phone'
 *         password:
 *           $ref: '#/components/schemas/AuthUserDto/properties/password'
 */

export const registerUserSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    phone: string({
      required_error: 'Phone is required',
    }).min(11, 'Not a valid phone'),
  }),
});

export type RegisterUserInput = Omit<TypeOf<typeof registerUserSchema>, 'body.passwordConfirmation'>;
