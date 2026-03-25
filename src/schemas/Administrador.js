import mongoose from "mongoose";

export const AdministradorSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
  },
});
