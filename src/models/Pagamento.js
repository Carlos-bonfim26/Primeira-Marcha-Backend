import mongoose from "mongoose";
import { PagamentoSchema } from "../Schemas/PagamentoSchema";

export const Pagamento = mongoose.model("Pagamento", PagamentoSchema);