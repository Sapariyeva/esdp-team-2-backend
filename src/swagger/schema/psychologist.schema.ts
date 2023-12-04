import { object, string, number, date, boolean, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Psychologist:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         fullName:
 *           type: string
 *           example: 'Василенко Василий Васильевич'
 *         gender:
 *           type: string
 *           enum: ['male', 'female']
 *           example: 'male'
 *         birthday:
 *           type: string
 *           format: date
 *           example: '1990-01-01'
 *         address:
 *           type: string
 *           example: 'г.Москва, ул. Психотерапии, 123'
 *         description:
 *           type: string
 *           example: 'Опытный психолог, специализируюсь на...'
 *         video:
 *           type: string
 *           example: 'https://www.youtube.com/...'
 *         experienceYears:
 *           type: number
 *           example: 5
 *         languages:
 *           type: string
 *           enum: ['kazakh', 'russian', 'english']
 *           example: 'russian'
 *         education:
 *           type: string
 *           example: 'Высшее психологическое'
 *         format:
 *           type: string
 *           enum: ['online', 'offline']
 *           example: 'online'
 *         cost:
 *           type: number
 *           example: 5000
 *         consultationType:
 *           type: string
 *           enum: ['solo', 'duo']
 *           example: 'solo'
 *         selfTherapy:
 *           type: number
 *           example: 3
 *         lgbt:
 *           type: boolean
 *           example: true
 *         isPublish:
 *           type: boolean
 *           example: true
 *         userId:
 *           type: number
 *           example: 1
 *         certificates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Certificate'
 *         cityId:
 *           type: number
 *           example: 1
 *         photos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Photo'
 *         techniques:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Technique'
 *         therapyMethods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TherapyMethod'
 *         symptoms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Symptom'
 *
 *     PostPsychologist:
 *       type: object
 *       required:
 *         - fullName
 *         - gender
 *         - birthday
 *         - address
 *         - description
 *         - video
 *         - experienceYears
 *         - languages
 *         - education
 *         - format
 *         - cost
 *         - consultationType
 *         - selfTherapy
 *         - lgbt
 *         - cityId
 *       properties:
 *         fullName:
 *           $ref: '#/components/schemas/Psychologist/properties/fullName'
 *         gender:
 *           $ref: '#/components/schemas/Psychologist/properties/gender'
 *         birthday:
 *           $ref: '#/components/schemas/Psychologist/properties/birthday'
 *         address:
 *           $ref: '#/components/schemas/Psychologist/properties/address'
 *         description:
 *           $ref: '#/components/schemas/Psychologist/properties/description'
 *         video:
 *           $ref: '#/components/schemas/Psychologist/properties/video'
 *         experienceYears:
 *           $ref: '#/components/schemas/Psychologist/properties/experienceYears'
 *         languages:
 *           $ref: '#/components/schemas/Psychologist/properties/languages'
 *         education:
 *           $ref: '#/components/schemas/Psychologist/properties/education'
 *         format:
 *           $ref: '#/components/schemas/Psychologist/properties/format'
 *         cost:
 *           $ref: '#/components/schemas/Psychologist/properties/cost'
 *         consultationType:
 *           $ref: '#/components/schemas/Psychologist/properties/consultationType'
 *         selfTherapy:
 *           $ref: '#/components/schemas/Psychologist/properties/selfTherapy'
 *         lgbt:
 *           $ref: '#/components/schemas/Psychologist/properties/lgbt'
 *         cityId:
 *           $ref: '#/components/schemas/Psychologist/properties/cityId'
 *         photos:
 *           $ref: '#/components/schemas/Psychologist/properties/photos'
 *         techniques:
 *           $ref: '#/components/schemas/Psychologist/properties/techniques'
 *         therapyMethods:
 *           $ref: '#/components/schemas/Psychologist/properties/therapyMethods'
 *         symptoms:
 *           $ref: '#/components/schemas/Psychologist/properties/symptoms'
 */

export const psychologistSchema = object({
  fullName: string({ required_error: 'Full name is required' }),
  gender: string({ required_error: 'Gender is required' }),
  birthday: date({ required_error: 'Birthday is required' }),
  address: string({ required_error: 'Address is required' }),
  description: string({ required_error: 'Description is required' }),
  video: string({ required_error: 'Video is required' }),
  experienceYears: number({ required_error: 'Experience years is required' }),
  languages: string({ required_error: 'Languages is required' }),
  education: string({ required_error: 'Education is required' }),
  format: string({ required_error: 'Format is required' }),
  cost: number({ required_error: 'Cost is required' }),
  consultationType: string({ required_error: 'Consultation type is required' }),
  selfTherapy: number({ required_error: 'Self therapy is required' }),
  lgbt: boolean({ required_error: 'LGBT is required' }),
  cityId: number({ required_error: 'City is required' }),
});

export type patient = Omit<TypeOf<typeof psychologistSchema>, 'body.passwordConfirmation'>;
