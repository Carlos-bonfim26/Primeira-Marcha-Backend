import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import { alunoRouter } from "./src/routes/alunoRouter.js";
import { instrutorRouter } from "./src/routes/InstrutorRouter.js";
const hostname =process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();
// config JSON
app.use(express.json());
app.use("/aluno", alunoRouter)
app.use("/instrutor", instrutorRouter)
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Passo inicial da primeira marcha" });
});

connectDB().then(() => {
  app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });
});
