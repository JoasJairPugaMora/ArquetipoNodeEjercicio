import { Router } from "express";
import { RoleFacade } from "../facade";
import { logger } from "../config/logger/logger";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/roles
 * @swagger
 * /roles:
 *  get:
 *    description: Get all roles
 *    tags: ["Roles"]
 *    responses:
 *      200:
 *        description: All roles
 *        content:
 *          appication/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleTo'
 *      400:
 *        description: Error bad parameters
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleTo'
 * components:
 *   schemas:
 *     RoleTo:
 *       type: object
 *       properties:
 *         name:
 *              type: string
 *              example: rjaforever
 */
router.get("", RoleFacade.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/roles
 * @swagger
 * /roles:
 *  post:
 *    description: create Roles
 *    tags: ["Roles"]
 *    requestBody:
 *      description: object roles
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RoleTo'
 *    responses:
 *      200:
 *        description: All Roles
 *        content:
 *          appication/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleTo'
 *      400:
 *        description: Error bad parameters
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorTo'
 */
router.post("", RoleFacade.create);

/**
 * PATCH method route
 * @example http://localhost:PORT/roles
 * @swagger
 * /roles/id:
 *  patch:
 *    description: update roles
 *    tags: ["Roles"]
 *    requestBody:
 *      description: object role
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RoleTo'
 *    responses:
 *      200:
 *        description: Role update
 *        content:
 *          appication/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleTo'
 *      400:
 *        description: Error bad parameters
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorTo'
 */
router.patch("/id", RoleFacade.update_role);

/**
 * DELETE method route
 * @example http://localhost:PORT/roles
 * @swagger
 * /roles/{id}/id:
 *  delete:
 *    description: delete roles
 *    tags: ["Roles"]
 *    parameters : [
 *      {
 *         name: 'id',
 *         in: 'path',
 *         schema: {
 *           type: 'number',
 *           example: 1
 *         },
 *         required: true
 *      }
 *    ]
 *    responses:
 *      200:
 *        description: All roles
 *      400:
 *        description: Error bad parameters
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorTo'
 */
router.delete("/:id/id", RoleFacade.delete_role);

router.get('/ping', async (req, res) => {
    logger.info("(%s) - Request accepted: %s","RoleRouter.ts",'');
    res.send('pong');
    logger.info("(%s) - Sending Response: %s","RoleRouter.ts",{data:"pong"});
});

/**
 * @export {express.Router}
 */
export { router };