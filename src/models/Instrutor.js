import mongoose from "mongoose";
import { InstrutorSchema } from "../schemas/InstrutorSchema.js";

export const Instrutor = mongoose.model("Instrutor", InstrutorSchema);