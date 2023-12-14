import { number, object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         psychologistId:
 *           type: number
 *           example: 1
 *         image:
 *           type: string
 *           example: "0df60525-2f2d-491f-b353-8ad3d4277370.jpg"
 *         description:
 *           type: string
 *           example: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"
 *         title:
 *           type: string
 *           example: 'sublime audax suasoria'
 *
 *     PostPosts:
 *       type: object
 *       required:
 *         - psychologistId
 *         - image
 *         - description
 *         - title
 *       properties:
 *         psychologistId:
 *           $ref: '#/components/schemas/Post/properties/psychologistId'
 *         image:
 *           $ref: '#/components/schemas/Post/properties/image'
 *         description:
 *           $ref: '#/components/schemas/Post/properties/description'
 *         title:
 *           $ref: '#/components/schemas/Post/properties/title'
 *
 *     PutPostText:
 *       type: object
 *       required:
 *         - psychologistId
 *         - description
 *         - title
 *       properties:
 *         psychologistId:
 *           $ref: '#/components/schemas/Post/properties/psychologistId'
 *         description:
 *           $ref: '#/components/schemas/Post/properties/description'
 *         title:
 *           $ref: '#/components/schemas/Post/properties/title'
 *
 *     PutPostImage:
 *       type: object
 *       required:
 *         - image
 *       properties:
 *         image:
 *           $ref: '#/components/schemas/Post/properties/image'
 *
 */

export const postSchema = object({
  psychologistId: number({
    required_error: 'Psychologist id is required',
  }),
  image: string({
    required_error: 'Image is required',
  }),
  description: string({
    required_error: 'Description is required',
  }),
  title: string({
    required_error: 'Title is required',
  }),
});

export type photo = Omit<TypeOf<typeof postSchema>, 'body.passwordConfirmation'>;
