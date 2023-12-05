import { object, string, number, date, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         address:
 *           type: string
 *           example: 'г.Москва, ул. Психотерапии, 123'
 *         patientId:
 *           type: number
 *           example: 1
 *         psychologistId:
 *           type: number
 *           example: 1
 *         cityId:
 *           type: number
 *           example: 1
 *         format:
 *           type: string
 *           enum: ['online', 'offline']
 *           example: 'online'
 *         cost:
 *           type: number
 *           example: 5000
 *         duration:
 *           type: number
 *           example: 60
 *         broadcast:
 *           type: string
 *           example: 'https://www.youtube.com/...'
 *         isCanceled:
 *           type: boolean
 *           example: false
 *         datetime:
 *           type: string
 *           format: date-time
 *           example: '2023-12-01T12:00:00Z'
 *         patientName:
 *           type: string
 *           example: 'John Doe'
 *
 *     RecordDto:
 *       type: object
 *       required:
 *         - patientId
 *         - psychologistId
 *         - datetime
 *         - patientName
 *       properties:
 *         isCanceled:
 *           $ref: '#/components/schemas/Record/properties/isCanceled'
 *         patientId:
 *           $ref: '#/components/schemas/Record/properties/patientId'
 *         psychologistId:
 *           $ref: '#/components/schemas/Record/properties/psychologistId'
 *         datetime:
 *           $ref: '#/components/schemas/Record/properties/datetime'
 *         patientName:
 *           $ref: '#/components/schemas/Record/properties/patientName'
 */

export const recordSchema = object({
  patientId: number({ required_error: 'Patient ID is required' }),
  psychologistId: number({ required_error: 'Psychologist ID is required' }),
  datetime: date({ required_error: 'Datetime is required' }),
  patientName: string({ required_error: 'Patient Name is required' }),
});

export type postRecord = Omit<TypeOf<typeof recordSchema>, 'id'>;
