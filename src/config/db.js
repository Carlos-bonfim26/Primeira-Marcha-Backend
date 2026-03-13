import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
export async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@primeiramarcha.1fwrg0w.mongodb.net/?appName=primeiraMarcha`,
    );
    console.log("Banco conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
    process.exit(1);
  }
}
