import mongoose from "mongoose";
import { AulaSchema } from "../schemas/AulaSchema.js";

export const Aula = mongoose.model("Aula", AulaSchema);