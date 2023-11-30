import { number, object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     TherapyMethod:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: 'Генштальт'
 *         id:
 *           type: number
 *           example: 1
 *
 *     PostTherapyMethod:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/TherapyMethod/properties/name'
 *
 *     GetAllTherapyMethod:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/TherapyMethod/properties/id'
 *
 *     GetOneTherapyMethod:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/TherapyMethod/properties/id'
 *
 *     PutOneTherapyMethod:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/TherapyMethod/properties/id'
 *         name:
 *           $ref: '#/components/schemas/TherapyMethod/properties/name'
 */

export const therapyMethodSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
  id: number({
    required_error: 'ID is required',
  }),
});

export type therapyMethod = Omit<TypeOf<typeof therapyMethodSchema>, 'body.passwordConfirmation'>;
