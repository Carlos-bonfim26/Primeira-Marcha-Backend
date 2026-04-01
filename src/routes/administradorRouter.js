import { Router } from "express";
import {
    cadastroAdministrador,
    atualizarAdministrador,
    deletarAdministrador,
    loginAdministrador,
    buscarAdministrador
} from "../controllers/AdministradorController.js";
import { authMiddleware } from "../middleware/auth.js";

export const administradorRouter = Router();

// Rotas públicas
administradorRouter.post("/administrador", cadastroAdministrador);
administradorRouter.post("/administrador/login", loginAdministrador);

// Rotas protegidas
administradorRouter.get("/administrador/:id", authMiddleware, buscarAdministrador);
administradorRouter.put("/administrador/:id", authMiddleware, atualizarAdministrador);
administradorRouter.delete("/administrador/:id", authMiddleware, deletarAdministrador);