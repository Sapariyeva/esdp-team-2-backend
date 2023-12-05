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
 *
 *     PostPhoto:
 *       type: object
 *       required:
 *         - photo
 *       properties:
 *         certificate:
 *           $ref: '#/components/schemas/Certificate/properties/photo'
 *
 */

export const photoSchema = object({
  photo: string({
    required_error: 'Photo is required',
  }),
});

export type photo = Omit<TypeOf<typeof photoSchema>, 'body.passwordConfirmation'>;
