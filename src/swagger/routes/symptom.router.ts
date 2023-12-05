import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { symptomSchema } from '../schema/symptom.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /symptoms/create:
   *   post:
   *     tags:
   *       - Symptoms
   *     summary: Adding symptom
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostSymptom'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Symptom'
   *       400:
   *         description: Bad request
   */
  app.post('/symptoms/create', validateResource(symptomSchema));

  /**
   * @openapi
   * /symptoms:
   *   get:
   *     tags:
   *       - Symptoms
   *     summary: Receiving all symptoms
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Symptom'
   */
  app.get('/symptoms');

  /**
   * @openapi
   * /symptoms/{id}:
   *   get:
   *     tags:
   *       - Symptoms
   *     summary: Receiving one symptom
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
   *               $ref: '#/components/schemas/Symptom'
   *       404:
   *         description: Not found
   */
  app.get('/symptoms/:id');

  /**
   * @openapi
   * /symptoms/edit/{id}:
   *   put:
   *     tags:
   *       - Symptoms
   *     summary: Update of one symptom
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostSymptom'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Symptom'
   *       400:
   *         description: Bad request
   */
  app.put('/symptoms/edit/:id', validateResource(symptomSchema));

  /**
   * @openapi
   * /symptoms/{id}:
   *   delete:
   *     tags:
   *       - Symptoms
   *     summary: Delete sympptom
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

  app.delete('/symptoms/:id');
}
export default routes;
