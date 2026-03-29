import mongoose from "mongoose";

export const InstrutorSchema = new mongoose.Schema({
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
  cnh: {
    type: String,
    required: true,
    unique: true,
  },
  credencialDetran: {
    type: String,
    required: true,
    unique: true,
  },
  valorAula: {
    type: Number,
    required: true,
  },
  statusInstrutor: {
    type: String
  }
});
