import mongoose from "mongoose";
import { PagamentoSchema } from "../schemas/PagamentoSchema.js";

export const Pagamento = mongoose.model("Pagamento", PagamentoSchema);