import mongoose from "mongoose";
import { AlunoSchema } from "../schemas/AlunoSchema.Js";

export const Aluno = mongoose.model("Aluno", AlunoSchema);