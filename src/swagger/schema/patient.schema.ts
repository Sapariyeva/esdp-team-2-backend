import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: 'Василий'
 *         id:
 *           type: number
 *           example: 1
 *         userId:
 *           type: number
 *           example: 1
 *
 *     PatientDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         userId:
 *           type: number
 *           example: 2
 *     PostPatient:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/Patient/properties/name'
 */

export const patientSchema = object({
  name: string({
    required_error: 'Name is required',
  }),
});

export type patient = Omit<TypeOf<typeof patientSchema>, 'body.passwordConfirmation'>;
