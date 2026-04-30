import mongoose from "mongoose";

export async function connectDB() {
  try {
   await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
});
    console.log("Banco conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
    throw error; 
  }
}
