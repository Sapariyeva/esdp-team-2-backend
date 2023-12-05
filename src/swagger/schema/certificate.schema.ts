import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       properties:
 *         certificate:
 *           type: string
 *           format: binary
 *         id:
 *           type: number
 *           example: 1
 *         psychologistId:
 *           type: number
 *           example: 1
 *
 *     PostCertificate:
 *       type: object
 *       required:
 *         - certificate
 *       properties:
 *         certificate:
 *           $ref: '#/components/schemas/Certificate/properties/certificate'
 *
 */

export const certificateSchema = object({
  certificate: string({
    required_error: 'Certificate is required',
  }),
});

export type certificate = Omit<TypeOf<typeof certificateSchema>, 'body.passwordConfirmation'>;
