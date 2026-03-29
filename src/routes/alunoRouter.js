import { Router } from "express";
import {
    cadastroAluno,
    atualizarAluno,
    deletarAluno,
    loginAluno,
    buscarAluno
} from "../controllers/alunoController.js";
import { authMiddleware } from "../middleware/auth.js";

export const alunoRouter = Router();

alunoRouter.post("/aluno", cadastroAluno);
alunoRouter.post("/aluno/login", loginAluno);

alunoRouter.get("/aluno/:id", authMiddleware, buscarAluno);
alunoRouter.put("/aluno/:id", authMiddleware, atualizarAluno);
alunoRouter.delete("/aluno/:id", authMiddleware, deletarAluno);