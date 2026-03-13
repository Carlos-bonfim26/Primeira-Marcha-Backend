import mongoose from "mongoose";
import { PagamentoSchema } from "../Schemas/PagamentoSchema.js";

export const Pagamento = mongoose.model("Pagamento", PagamentoSchema);