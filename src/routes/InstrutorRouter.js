import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import {
  cadastroInstrutor,
  listarInstrutores,
  atualizarInstrutor,
  atualizarStatusInstrutor,
  atualizarValorAula,
  deletarInstrutor,
  buscarInstrutorPorCidade,
  buscarInstrutorPorId,
  aprovarInstrutor,
  loginInstrutor,
} from "../controllers/InstrutorController.js";
import { authMiddleware } from "../middleware/auth.js";

export const instrutorRouter = Router();

// ─── Rotas públicas ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /instrutor:
 *   post:
 *     summary: Cadastra um novo instrutor
 *     tags: [Instrutor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, cpf, cidade]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               cpf:
 *                 type: string
 *                 example: "000.000.000-00"
 *               dataNasc:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               cidade:
 *                 type: string
 *                 example: São Paulo
 *               UF:
 *                 type: string
 *                 example: SP
 *               cnh:
 *                 type: string
 *                 example: "12345678900"
 *               credencialDetran:
 *                 type: string
 *                 example: "12345678900"
 *               valorAula:
 *                 type: number
 *                 example: 120.00
 *     responses:
 *       201:
 *         description: Instrutor cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
instrutorRouter.post("/instrutor", cadastroInstrutor);

/**
 * @swagger
 * /instrutor/login:
 *   post:
 *     summary: Realiza o login de um instrutor
 *     tags: [Instrutor]
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
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso — retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
instrutorRouter.post("/instrutor/login", loginInstrutor);

// ─── Rotas protegidas ─────────────────────────────────────────────────────────

/**
 * @swagger
 * /instrutores:
 *   get:
 *     summary: Lista todos os instrutores
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instrutores retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
instrutorRouter.get("/instrutores", authMiddleware, listarInstrutores);

/**
 * @swagger
 * /instrutor/{id}:
 *   get:
 *     summary: Busca um instrutor pelo ID
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do instrutor
 *     responses:
 *       200:
 *         description: Instrutor encontrado
 *       404:
 *         description: Instrutor não encontrado
 */
instrutorRouter.get("/instrutor/:id", authMiddleware, buscarInstrutorPorId);

/**
 * @swagger
 * /instrutores/cidade/{cidade}:
 *   get:
 *     summary: Busca instrutores por cidade
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cidade
 *         required: true
 *         schema:
 *           type: string
 *         example: São Paulo
 *     responses:
 *       200:
 *         description: Lista de instrutores da cidade
 */
instrutorRouter.get(
  "/instrutores/cidade/:cidade",
  authMiddleware,
  buscarInstrutorPorCidade,
);

/**
 * @swagger
 * /instrutor/{id}:
 *   put:
 *     summary: Atualiza os dados de um instrutor
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               cidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Instrutor atualizado com sucesso
 *       404:
 *         description: Instrutor não encontrado
 */
instrutorRouter.put("/instrutor/:id", authMiddleware, atualizarInstrutor);

/**
 * @swagger
 * /instrutor/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um instrutor
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: ativo
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
instrutorRouter.patch(
  "/instrutor/:id/status",
  authMiddleware,
  atualizarStatusInstrutor,
);

/**
 * @swagger
 * /instrutor/{id}/valor-aula:
 *   patch:
 *     summary: Atualiza o valor da aula de um instrutor
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorAula:
 *                 type: number
 *                 example: 120.00
 *     responses:
 *       200:
 *         description: Valor da aula atualizado com sucesso
 */
instrutorRouter.patch(
  "/instrutor/:id/valor-aula",
  authMiddleware,
  atualizarValorAula,
);

/**
 * @swagger
 * /instrutor/aprovar/{cpf}:
 *   patch:
 *     summary: Aprova um instrutor pelo CPF
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "000.000.000-00"
 *     responses:
 *       200:
 *         description: Instrutor aprovado com sucesso
 *       404:
 *         description: Instrutor não encontrado
 */
instrutorRouter.patch(
  "/instrutor/aprovar/:cpf",
  authMiddleware,
  aprovarInstrutor,
);

/**
 * @swagger
 * /instrutor/{id}:
 *   delete:
 *     summary: Remove um instrutor
 *     tags: [Instrutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Instrutor removido com sucesso
 *       404:
 *         description: Instrutor não encontrado
 */
instrutorRouter.delete("/instrutor/:id", authMiddleware, deletarInstrutor);
