import { Router } from "express";

import { cadastroAluno } from "../controllers/AlunoController.js";

export const alunoRouter = Router();

/**
 * @swagger
 * /aluno:
 *   post:
 *     summary: Cadastra um novo aluno
 */
alunoRouter.post("/aluno", cadastroAluno)

