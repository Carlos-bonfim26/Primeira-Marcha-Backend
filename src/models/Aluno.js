import mongoose from "mongoose";
import { AlunoSchema } from "../Schemas/AlunoSchema.Js";

export const Aluno = mongoose.model("Aluno", AlunoSchema);