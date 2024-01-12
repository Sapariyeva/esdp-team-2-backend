import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Symptom:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: 'Тревожность'
 *
 *     PostSymptom:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Symptom/properties/name'
 */
export const symptomSchema = object({
  name: string({ required_error: 'Name is required' }),
});

export type symptom = Omit<TypeOf<typeof symptomSchema>, 'body.passwordConfirmation'>;
