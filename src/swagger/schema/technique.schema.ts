import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Technique:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: 'Когнитивно-поведенческая терапия'
 *
 *     PostTechnique:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Technique/properties/name'
 */

export const techniqueSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
});

export type technique = Omit<TypeOf<typeof techniqueSchema>, 'body.passwordConfirmation'>;
