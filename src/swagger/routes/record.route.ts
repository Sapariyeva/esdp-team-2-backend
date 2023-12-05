import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { recordSchema } from '../schema/record.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /records:
   *   get:
   *     tags:
   *       - Records
   *     summary: Get all records
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Record'
   */
  app.get('/records');

  /**
   * @openapi
   * /records/{id}:
   *   get:
   *     tags:
   *       - Records
   *     summary: Get one record by ID
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
   *               $ref: '#/components/schemas/Record'
   *       404:
   *         description: Not found
   */
  app.get('/records/:id');

  /**
   * @openapi
   * /records/create:
   *   post:
   *     tags:
   *       - Records
   *     summary: Create a new record
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RecordDto'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Record'
   *       400:
   *         description: Bad request
   */
  app.post('/records/create', validateResource(recordSchema));

  /**
   * @openapi
   * /records/{id}/cancel:
   *   post:
   *     tags:
   *       - Records
   *     summary: Cancel a record by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the record to cancel
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  app.post('/:id/cancel');
}
export default routes;
