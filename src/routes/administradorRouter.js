import { Router } from "express";
import {
  cadastroAdministrador,
  atualizarAdministrador,
  deletarAdministrador,
  loginAdministrador,
  buscarAdministrador,
} from "../controllers/AdminstradorController.js";
import { authMiddleware } from "../middleware/auth.js";

export const administradorRouter = Router();

// ─── Rotas públicas ───────────────────────────────────────────────────────────

/**
 * @swagger
 * /administrador:
 *   post:
 *     summary: Cadastra um novo administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, type]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Admin
 *               email:
 *                 type: string
 *                 example: carlos@admin.com
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *               type:
 *                 type: string
 *                 example: superadmin
 *     responses:
 *       201:
 *         description: Administrador cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
administradorRouter.post("/administrador", cadastroAdministrador);

/**
 * @swagger
 * /administrador/login:
 *   post:
 *     summary: Realiza o login de um administrador
 *     tags: [Administrador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos@admin.com
 *               senha:
 *                 type: string
 *                 example: "senhaSegura123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso — retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
administradorRouter.post("/administrador/login", loginAdministrador);

// ─── Rotas protegidas ─────────────────────────────────────────────────────────

/**
 * @swagger
 * /administrador/{id}:
 *   get:
 *     summary: Busca um administrador pelo ID
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Administrador não encontrado
 */
administradorRouter.get("/administrador/:id", authMiddleware, buscarAdministrador);

/**
 * @swagger
 * /administrador/{id}:
 *   put:
 *     summary: Atualiza os dados de um administrador
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Administrador não encontrado
 */
administradorRouter.put("/administrador/:id", authMiddleware, atualizarAdministrador);

/**
 * @swagger
 * /administrador/{id}:
 *   delete:
 *     summary: Remove um administrador
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Administrador não encontrado
 */
administradorRouter.delete("/administrador/:id", authMiddleware, deletarAdministrador);