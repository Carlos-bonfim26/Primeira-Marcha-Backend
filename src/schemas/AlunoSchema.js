import mongoose from "mongoose";

export const AlunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  dataNasc: {
    type: Date,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  UF: {
    type: String,
    required: true,
  },
});
