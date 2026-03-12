import mongoose from "mongoose";
export const AgendaSchema = new mongoose.Schema( {
  instrutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instrutor",
    required: true,
  },
  listaAula: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aula",
    },
  ],
});
