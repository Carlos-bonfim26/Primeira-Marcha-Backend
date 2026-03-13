import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
const hostname =process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();
// config JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Passo inicial da primeira marcha" });
});

connectDB().then(() => {
  app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });
});
