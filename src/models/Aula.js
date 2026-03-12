import mongoose from "mongoose";
import { AulaSchema } from "../Schemas/AulaSchema";

export const Aula = mongoose.model("Aula", AulaSchema);