import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { certificateSchema } from '../schema/certificate.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /certificates/create:
   *   post:
   *     tags:
   *       - Certificates
   *     summary: Create certificate
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/PostCertificate'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Certificate'
   *       400:
   *         description: Bad request
   */

  app.post('/certificates/create', validateResource(certificateSchema));

  /**
   * @openapi
   * /certificates/{id}:
   *   delete:
   *     tags:
   *       - Certificates
   *     summary: Delete certificate by id
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

  app.delete('/certificates/:id');
}
export default routes;
