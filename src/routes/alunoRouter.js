import { Router } from "express";

import { cadastroAluno } from "../controllers/AlunoController.js";

export const alunoRouter = Router();

alunoRouter.post("/aluno", cadastroAluno)

