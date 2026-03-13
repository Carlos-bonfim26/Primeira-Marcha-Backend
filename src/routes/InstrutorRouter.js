import { Router } from "express";

import { cadastroInstrutor } from "../controllers/InstrutorController.js";

export const instrutorRouter = Router();

instrutorRouter.post("/cadastro", cadastroInstrutor)
