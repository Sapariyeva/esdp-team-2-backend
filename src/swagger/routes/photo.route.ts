import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { photoSchema } from '../schema/photo.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /photo/create:
   *   post:
   *     tags:
   *       - Photos
   *     summary: Create photo
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/PostPhoto'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Photo'
   *       400:
   *         description: Bad request
   */

  app.post('/photos/create', validateResource(photoSchema));

  /**
   * @openapi
   * /photos/{id}:
   *   delete:
   *     tags:
   *       - Photos
   *     summary: Delete photo by id
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */

  app.delete('/photos/:id');
}
export default routes;
