import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoDbUri = process.env.MONGODB_URI;
export async function connectDB() {
  try {
    await mongoose.connect(
      mongoDbUri
    );
    console.log("Banco conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
    throw error;
  }
}
