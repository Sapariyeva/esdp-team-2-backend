import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Photo:
 *       type: object
 *       properties:
 *         photo:
 *           type: string
 *           format: binary
 *         id:
 *           type: number
 *           example: 1
 *         psychologistId:
 *           type: number
 *           example: 1
 */

export const certificateSchema = object({
  photo: string({
    required_error: 'Photo is required',
  }),
});

export type certificate = Omit<TypeOf<typeof certificateSchema>, 'body.passwordConfirmation'>;
