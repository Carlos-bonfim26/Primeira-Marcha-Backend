import mongoose from "mongoose";

export const PagamentoSchema = new mongoose.Schema({
  aula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aula",
    required: true,
  },
  valorTotal: {
    type: Number,
    required: true,
  },
  qtdAula: {
    type: Number,
    required: true,
  },
  statusPagamento: {
    type: String,
    required: true,
  },
});
