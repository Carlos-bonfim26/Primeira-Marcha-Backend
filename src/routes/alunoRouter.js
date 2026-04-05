import { Router } from "express";
import {
  cadastroAluno,
  atualizarAluno,
  deletarAluno,
  loginAluno,
  buscarAluno,
} from "../controllers/AlunoController.js";
import { authMiddleware } from "../middleware/auth.js";

export const alunoRouter = Router();

// ─── Rotas públicas ───────────────────────────────────────────────────────────

/**
 * @swagger
 * /aluno:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Aluno]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, cpf, dataNasc, cidade, UF]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *               cpf:
 *                 type: string
 *                 example: "111.222.333-44"
 *               dataNasc:
 *                 type: string
 *                 format: date
 *                 example: "2000-05-15"
 *               cidade:
 *                 type: string
 *                 example: Campinas
 *               UF:
 *                 type: string
 *                 example: SP
 *     responses:
 *       201:
 *         description: Aluno cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
alunoRouter.post("/aluno", cadastroAluno);

/**
 * @swagger
 * /aluno/login:
 *   post:
 *     summary: Realiza o login de um aluno
 *     tags: [Aluno]
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
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso — retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
alunoRouter.post("/aluno/login", loginAluno);

// ─── Rotas protegidas ─────────────────────────────────────────────────────────

/**
 * @swagger
 * /aluno/{id}:
 *   get:
 *     summary: Busca um aluno pelo ID
 *     tags: [Aluno]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aluno não encontrado
 */
alunoRouter.get("/aluno/:id", authMiddleware, buscarAluno);

/**
 * @swagger
 * /aluno/{id}:
 *   put:
 *     summary: Atualiza os dados de um aluno
 *     tags: [Aluno]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
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
 *               UF:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aluno não encontrado
 */
alunoRouter.put("/aluno/:id", authMiddleware, atualizarAluno);

/**
 * @swagger
 * /aluno/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     tags: [Aluno]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aluno não encontrado
 */
alunoRouter.delete("/aluno/:id", authMiddleware, deletarAluno);