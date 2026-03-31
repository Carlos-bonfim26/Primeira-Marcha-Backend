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
aulaRouter.post("/aula", authMiddleware, marcarAula);
aulaRouter.patch("/aula/:id/cancelar", authMiddleware, cancelarAula);
aulaRouter.patch("/aula/:id/concluir", authMiddleware, concluirAula);
aulaRouter.get("/aula/:id", authMiddleware, buscarAula);
aulaRouter.get("/aulas/aluno/:alunoId", authMiddleware, listarAulasAluno);
aulaRouter.get(
  "/aulas/instrutor/:instrutorId",
  authMiddleware,
  listarAulasInstrutor,
);
aulaRouter.patch("/aula/:id/aceitar", authMiddleware, aceitarAula);
aulaRouter.patch("/aula/:id/rejeitar", authMiddleware, recusarAula);
aulaRouter.patch("/aula/:id/reagendar", authMiddleware, reagendarAula);
