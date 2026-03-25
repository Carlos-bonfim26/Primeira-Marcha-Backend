import { Router } from "express";

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
  loginInstrutor
} from "../controllers/InstrutorController.js";
import { authMiddleware } from "../middleware/auth.js";
export const instrutorRouter = Router();
// rotas públicas
/**
 * @swagger
 * /instrutor:
 *   post:
 *     summary: Cadastra um novo instrutor
 */
instrutorRouter.post("/instrutor", cadastroInstrutor);
/**
 * @swagger
 * /instrutor/login:
 *   post:
 *     summary: Realiza o login de um instrutor
 */
instrutorRouter.post("/instrutor/login", loginInstrutor);


// rotas protegidas
/**
 * @swagger
 * /instrutores:
 *   get:
 *     summary: Lista instrutores
 */
instrutorRouter.get("/instrutores",authMiddleware, listarInstrutores);


/**
 * @swagger
 * /instrutor/{id}:
 *   put:
 *     summary: Atualiza um instrutor
 */
instrutorRouter.put("/instrutor/:id", authMiddleware, atualizarInstrutor);

/**
 * @swagger
 * /instrutor/{id}:
 *   patch:
 *     summary: Atualiza o status de um instrutor
 */
instrutorRouter.patch("/instrutor/:id/status", authMiddleware, atualizarStatusInstrutor);
/** * @swagger
 * /instrutor/{id}/valor-aula:
 *   patch:
 *     summary: Atualiza o valor da aula de um instrutor
 */
instrutorRouter.patch("/instrutor/:id/valor-aula", authMiddleware, atualizarValorAula);
instrutorRouter.delete("/instrutor/:id", authMiddleware, deletarInstrutor);
/**
 * @swagger
 * /instrutor/{id}:
 *   get:
 *     summary: Busca um instrutor por ID
 */
instrutorRouter.get("/instrutor/:id", authMiddleware, buscarInstrutorPorId);
/**
 * @swagger
 * /instrutor/{id}:
 *   get:
 *     summary: Busca um instrutor por ID
 */
instrutorRouter.get("/instrutor/:id", authMiddleware, buscarInstrutorPorId);
/**
 * @swagger
 * /instrutores/cidade/{cidade}:
 *   get:
 *     summary: Busca instrutores por cidade
 */
instrutorRouter.get("/instrutores/cidade/:cidade", authMiddleware, buscarInstrutorPorCidade);
instrutorRouter.patch("/instrutor/aprovar/:cpf", authMiddleware, aprovarInstrutor);
