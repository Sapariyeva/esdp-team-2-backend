import { Express, Request, Response } from 'express';
import validateResource from '../middlewares/validateResource';
import { loginUserSchema } from './schema/authSessions.schema';
import { registerUserSchema } from './schema/authRegister.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /auth/sessions:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User login
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginUserInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginUserResponse'
   *       400:
   *         description: Bad request
   */

  app.post('/auth/sessions', validateResource(loginUserSchema));

  /**
   * @openapi
   * /auth/register:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User registration
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterUserInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RegisterUserResponse'
   *       400:
   *         description: Bad request
   */

  app.post('/auth/sessions', validateResource(registerUserSchema));

  /**
   * @openapi
   * /auth/refresh-token:
   *  get:
   *     tags:
   *     - Auth
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad request
   */
  app.get('/refresh-token', (req: Request, res: Response) => res.sendStatus(200));
}
export default routes;
