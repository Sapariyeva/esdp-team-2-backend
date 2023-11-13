import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - phone
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        phone:
 *          type: string
 *          default: 87777777777
 *        password:
 *          type: string
 *          default: 123123
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        phone:
 *          type: string
 *        password:
 *          type: string
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