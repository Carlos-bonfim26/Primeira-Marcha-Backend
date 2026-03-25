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
instrutorRouter.post("/instrutor", cadastroInstrutor);
instrutorRouter.post("/instrutor/login", loginInstrutor);

// rotas protegidas
instrutorRouter.get("/instrutores",authMiddleware, listarInstrutores);
instrutorRouter.put("/instrutor/:id", authMiddleware, atualizarInstrutor);
instrutorRouter.patch("/instrutor/:id/status", authMiddleware, atualizarStatusInstrutor);
instrutorRouter.patch("/instrutor/:id/valor-aula", authMiddleware, atualizarValorAula);
instrutorRouter.delete("/instrutor/:id", authMiddleware, deletarInstrutor);
instrutorRouter.get("/instrutor/:id", authMiddleware, buscarInstrutorPorId);
instrutorRouter.get("/instrutores/cidade/:cidade", authMiddleware, buscarInstrutorPorCidade);
instrutorRouter.patch("/instrutor/aprovar/:cpf", authMiddleware, aprovarInstrutor);
