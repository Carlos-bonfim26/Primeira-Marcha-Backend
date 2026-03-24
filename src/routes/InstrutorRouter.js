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
  aprovarInstrutor
} from "../controllers/InstrutorController.js";

export const instrutorRouter = Router();

instrutorRouter.post("/instrutor", cadastroInstrutor);
instrutorRouter.get("/instrutores", listarInstrutores);
instrutorRouter.put("/instrutor/:id", atualizarInstrutor);
instrutorRouter.patch("/instrutor/:id/status", atualizarStatusInstrutor);
instrutorRouter.patch("/instrutor/:id/valor-aula", atualizarValorAula);
instrutorRouter.delete("/instrutor/:id", deletarInstrutor);
instrutorRouter.get("/instrutor/:id", buscarInstrutorPorId);
instrutorRouter.get("/instrutores/cidade/:cidade", buscarInstrutorPorCidade);
instrutorRouter.patch("/instrutor/aprovar/:cpf", aprovarInstrutor);