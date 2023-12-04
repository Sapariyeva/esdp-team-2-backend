import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { psychologistSchema } from '../schema/psychologist.schema';

function routes(app: Express) {
  /**
   * @openapi
   * /psychologists/create:
   *   post:
   *     tags:
   *       - Psychologists
   *     summary: Create psychologist
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/PostPsychologist'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Psychologist'
   *       400:
   *         description: Bad request
   */
  app.post('/psychologists/create', validateResource(psychologistSchema));

  /**
   * @openapi
   * /psychologists/{id}:
   *   get:
   *     tags:
   *       - Psychologists
   *     summary: Get psychologist by ID
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
   *               $ref: '#/components/schemas/Psychologist'
   *       404:
   *         description: Not found
   */
  app.get('/psychologists/:id');

  /**
   * @openapi
   * /psychologists:
   *   get:
   *     tags:
   *       - Psychologists
   *     summary: Get all psychologists
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Psychologist'
   */
  app.get('/psychologists');

  /**
   * @openapi
   * /psychologists/edit/{id}:
   *   put:
   *     tags:
   *       - Psychologists
   *     summary: Edit psychologist
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostPsychologist'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Psychologist'
   *       400:
   *         description: Bad request
   */
  app.put('/psychologists/edit/:id', validateResource(psychologistSchema));

  /**
   * @openapi
   * /psychologists/publish/{id}:
   *   post:
   *     tags:
   *       - Psychologists
   *     summary: Publish psychologist profile
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
  app.post('/psychologists/publish/:id', validateResource(psychologistSchema));

  /**
   * @openapi
   * /psychologists/{id}:
   *   delete:
   *     tags:
   *       - Psychologists
   *     summary: Delete psychologist by ID
   *     security:
   *       - bearerAuth: []
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
  app.delete('/psychologists/:id');
}
export default routes;
