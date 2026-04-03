import mongoose from "mongoose";
import { AlunoSchema } from "../schemas/AlunoSchema.js";

export const Aluno = mongoose.model("Aluno", AlunoSchema);