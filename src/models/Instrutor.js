import mongoose from "mongoose";
import { InstrutorSchema } from "../Schemas/InstrutorSchema";

export const Instrutor = mongoose.model("Instrutor", InstrutorSchema);