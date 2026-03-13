import mongoose from "mongoose";
import { AulaSchema } from "../Schemas/AulaSchema.js";

export const Aula = mongoose.model("Aula", AulaSchema);