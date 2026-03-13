import mongoose from "mongoose";
import { InstrutorSchema } from "../Schemas/InstrutorSchema.js";

export const Instrutor = mongoose.model("Instrutor", InstrutorSchema);