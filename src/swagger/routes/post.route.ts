import { Express } from 'express';
import validateResource from '../../middlewares/validateResource';
import { postSchema } from '../schema/post.schema';
function routes(app: Express) {
  /**
   * @openapi
   * /posts/create:
   *   post:
   *     tags:
   *       - Posts
   *     summary: Create post
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/PostPosts'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       400:
   *         description: Bad request
   */

  app.post('/posts/create', validateResource(postSchema));

  /**
   * @openapi
   * /posts:
   *   get:
   *     tags:
   *       - Posts
   *     summary: Get all posts
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   */
  app.get('/posts');

  /**
   * @openapi
   * /posts/{id}:
   *   get:
   *     tags:
   *       - Posts
   *     summary: Get one post
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
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   *       404:
   *         description: Not found
   */
  app.get('/posts/:id');

  /**
   * @openapi
   * /posts/{id}/edit:
   *   put:
   *     tags:
   *       - Posts
   *     summary: Update of one post text
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PutPostText'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       400:
   *         description: Bad request
   */
  app.put('/posts/:id/edit', validateResource(postSchema));

  /**
   * @openapi
   * /posts/{id}/change-image:
   *   put:
   *     tags:
   *       - Posts
   *     summary: Update of one post image
   *     parameters:
   *     - name: id
   *       in: path
   *       required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PutPostImage'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       400:
   *         description: Bad request
   */
  app.put('/posts/:id/change-image', validateResource(postSchema));

  /**
   * @openapi
   * /posts/{id}:
   *   delete:
   *     tags:
   *       - Posts
   *     summary: Delete post by id
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

  app.delete('/posts/:id');
}
export default routes;
