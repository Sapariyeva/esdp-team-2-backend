import { Express } from 'express';
function routes(app: Express) {
  /**
   * @openapi
   * /cities:
   *   get:
   *     tags:
   *       - City
   *     summary: Getting all cities
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */

  app.get('/cities');
}
export default routes;
