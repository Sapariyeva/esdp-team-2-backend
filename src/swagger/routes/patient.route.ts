import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { patientSchema } from '../schema/patient.schema';

function routes(app: Express) {
  /**
   * @openapi
   * /patients/create:
   *   post:
   *     tags:
   *       - Patients
   *     summary: Create patient
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostPatient'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Patient'
   *       400:
   *         description: Bad request
   */
  app.post('/patients/create', validateResource(patientSchema));

  /**
   * @openapi
   * /patients/{id}:
   *   delete:
   *     tags:
   *       - Patients
   *     summary: Delete patient by id
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  app.delete('/patients/:id');

  /**
   * @openapi
   * /patients/edit/{id}:
   *   put:
   *     tags:
   *       - Patients
   *     summary: Edit patient by id
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PostPatient'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Patient'
   *       400:
   *         description: Bad request
   */
  app.put('/patients/edit/:id', validateResource(patientSchema));

  /**
   * @openapi
   * /patients/{id}/favorites:
   *   post:
   *     tags:
   *       - Patients
   *     summary: Add or delete psychologist in patient's favorites
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               psychologistId:
   *                 type: number
   *                 example: 1
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  app.post('/:id/favorites', validateResource(patientSchema));

  /**
   * @openapi
   * /patients:
   *   get:
   *     tags:
   *       - Patients
   *     summary: Get all patients
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Patient'
   */
  app.get('/patients');

  /**
   * @openapi
   * /patients/{id}:
   *   get:
   *     tags:
   *       - Patients
   *     summary: Get patient by id
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Patient'
   *       400:
   *         description: Bad request
   */
  app.get('/patients/:id');
}
export default routes;
