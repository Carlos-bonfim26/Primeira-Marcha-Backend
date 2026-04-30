import { Router } from "express";
import { createPreference } from "../config/payment.js";
import { authMiddleware } from "../middleware/auth.js";

export const paymentRouter = Router();

/**
 * @swagger
 * /create-preference:
 *   post:
 *     summary: Cria uma preferência de pagamento no Mercado Pago
 *     tags: [Pagamento]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, quantity, unit_price]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Camiseta Primeira Marcha"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               unit_price:
 *                 type: number
 *                 example: 79.90
 *     responses:
 *       200:
 *         description: Preferência criada com sucesso — retorna o link de pagamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Preferência de pagamento criada com sucesso"
 *                 response:
 *                   type: string
 *                   example: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=..."
 *       401:
 *         description: Não autorizado — token JWT ausente ou inválido
 *       500:
 *         description: Erro interno ao criar preferência de pagamento
 */
paymentRouter.post("/create-preference", authMiddleware, async (req, res) => {
  await createPreference(req, res);
});

/**
 * @swagger
 * /success:
 *   get:
 *     summary: Callback de pagamento aprovado
 *     tags: [Pagamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pagamento aprovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Pagamento aprovado com sucesso"
 *       401:
 *         description: Não autorizado
 */
paymentRouter.get("/success", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "Pagamento aprovado com sucesso" });
});

/**
 * @swagger
 * /failure:
 *   get:
 *     summary: Callback de pagamento recusado
 *     tags: [Pagamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pagamento recusado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Pagamento recusado"
 *       401:
 *         description: Não autorizado
 */
paymentRouter.get("/failure", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "Pagamento recusado" });
});

/**
 * @swagger
 * /pending:
 *   get:
 *     summary: Callback de pagamento pendente
 *     tags: [Pagamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pagamento pendente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Pagamento pendente"
 *       401:
 *         description: Não autorizado
 */
paymentRouter.get("/pending", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "Pagamento pendente" });
});