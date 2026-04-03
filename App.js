import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import { alunoRouter } from "./src/routes/alunoRouter.js";
import { instrutorRouter } from "./src/routes/InstrutorRouter.js";
import { administradorRouter } from "./src/routes/administradorRouter.js";
import { aulaRouter } from "./src/routes/aulaRouter.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/docs/swagger.js";
const app = express();

let isConnected = false;
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    next();
});
// config JSON
app.use(express.json());
// config CORS
app.use(cors());
app.use(alunoRouter)
app.use(instrutorRouter)
app.use(administradorRouter)
app.use(aulaRouter)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Passo inicial da primeira marcha" });
});

export default app;