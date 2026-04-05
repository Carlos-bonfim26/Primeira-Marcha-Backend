import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  marcarAula,
  cancelarAula,
  concluirAula,
  buscarAula,
  listarAulasAluno,
  listarAulasInstrutor,
  aceitarAula,
  recusarAula,
  reagendarAula,
} from "../controllers/AulaController.js";

export const aulaRouter = Router();

/**
 * @swagger
 * /aula:
 *   post:
 *     summary: Marca uma nova aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [aluno, instrutor, dataInicio, dataFinal, UF, localAula, statusAula]
 *             properties:
 *               aluno:
 *                 type: string
 *                 description: ID do aluno (ObjectId)
 *                 example: "64a1f2c3e4b5678901234567"
 *               instrutor:
 *                 type: string
 *                 description: ID do instrutor (ObjectId)
 *                 example: "64a1f2c3e4b5678901234568"
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-10T09:00:00Z"
 *               dataFinal:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-10T10:00:00Z"
 *               UF:
 *                 type: string
 *                 example: SP
 *               localAula:
 *                 type: string
 *                 example: Rua das Flores, 123
 *               statusAula:
 *                 type: string
 *                 example: agendada
 *     responses:
 *       201:
 *         description: Aula marcada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
aulaRouter.post("/aula", authMiddleware, marcarAula);

/**
 * @swagger
 * /aula/{id}:
 *   get:
 *     summary: Busca uma aula pelo ID
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Aula encontrada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.get("/aula/:id", authMiddleware, buscarAula);

/**
 * @swagger
 * /aulas/aluno/{alunoId}:
 *   get:
 *     summary: Lista todas as aulas de um aluno
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Lista de aulas do aluno
 *       401:
 *         description: Não autorizado
 */
aulaRouter.get("/aulas/aluno/:alunoId", authMiddleware, listarAulasAluno);

/**
 * @swagger
 * /aulas/instrutor/{instrutorId}:
 *   get:
 *     summary: Lista todas as aulas de um instrutor
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: instrutorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do instrutor
 *     responses:
 *       200:
 *         description: Lista de aulas do instrutor
 *       401:
 *         description: Não autorizado
 */
aulaRouter.get("/aulas/instrutor/:instrutorId", authMiddleware, listarAulasInstrutor);

/**
 * @swagger
 * /aula/{id}/cancelar:
 *   patch:
 *     summary: Cancela uma aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Aula cancelada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.patch("/aula/:id/cancelar", authMiddleware, cancelarAula);

/**
 * @swagger
 * /aula/{id}/concluir:
 *   patch:
 *     summary: Conclui uma aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Aula concluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.patch("/aula/:id/concluir", authMiddleware, concluirAula);

/**
 * @swagger
 * /aula/{id}/aceitar:
 *   patch:
 *     summary: Instrutor aceita uma aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Aula aceita com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.patch("/aula/:id/aceitar", authMiddleware, aceitarAula);

/**
 * @swagger
 * /aula/{id}/rejeitar:
 *   patch:
 *     summary: Instrutor rejeita uma aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     responses:
 *       200:
 *         description: Aula rejeitada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.patch("/aula/:id/rejeitar", authMiddleware, recusarAula);

/**
 * @swagger
 * /aula/{id}/reagendar:
 *   patch:
 *     summary: Reagenda uma aula
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da aula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-15T09:00:00Z"
 *               dataFinal:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-15T10:00:00Z"
 *     responses:
 *       200:
 *         description: Aula reagendada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Aula não encontrada
 */
aulaRouter.patch("/aula/:id/reagendar", authMiddleware, reagendarAula);