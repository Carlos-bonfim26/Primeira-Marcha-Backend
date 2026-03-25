import mongoose from "mongoose";
import { AdministradorSchema } from "../schemas/Administrador.js";

export const Administrador = mongoose.model("Administrador", AdministradorSchema);
