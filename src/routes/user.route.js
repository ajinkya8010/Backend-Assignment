import express from "express";
import { getUserProfile, makeAdmin } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

/**
 *@swagger
 * tags:
 *   - name: Users
 *     description: User management and profile operations
 */

/**
 *@swagger
 * /users/user-profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 63f1e432bf1d4f06e5a8e123
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/user-profile", verifyToken, getUserProfile);

/**
 *@swagger
 * /users/{id}/make-admin:
 *   put:
 *     summary: Make a user an admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be promoted to admin
 *         schema:
 *           type: string
 *           example: 63f1e432bf1d4f06e5a8e123
 *     responses:
 *       200:
 *         description: User role updated to admin
 *       403:
 *         description: You do not have permission to make someone an admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id/make-admin', verifyToken, makeAdmin);

export default router;
