import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { techniqueSchema } from '../schema/technique.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /technique/create:
   *   post:
   *     tags:
   *       - Techniques
   *     summary: Adding technique
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostTechnique'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Technique'
   *       400:
   *         description: Bad request
   */
  app.post('/techniques/create', validateResource(techniqueSchema));

  /**
   * @openapi
   * /techniques:
   *   get:
   *     tags:
   *       - Techniques
   *     summary: Receiving all techniques
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Technique'
   */
  app.get('/techniques');

  /**
   * @openapi
   * /techniques/{id}:
   *   get:
   *     tags:
   *       - Techniques
   *     summary: Receiving one technique
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Technique'
   *       404:
   *         description: Not found
   */
  app.get('/techniques/:id');

  /**
   * @openapi
   * /techniques/edit/{id}:
   *   put:
   *     tags:
   *       - Techniques
   *     summary: Update of one technique
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostTechnique'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Technique'
   *       400:
   *         description: Bad request
   */
  app.put('/techniques/edit/:id', validateResource(techniqueSchema));

  /**
   * @openapi
   * /techniques/{id}:
   *   delete:
   *     tags:
   *       - Techniques
   *     summary: Delete technique
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

  app.delete('/techniques/:id');
}
export default routes;
