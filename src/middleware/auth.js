import jwt from "jsonwebtoken";
import { Instrutor } from "../models/Instrutor.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token não fornecido" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const instrutor = await Instrutor.findOne({ email: decoded.email });

    if (!instrutor) {
      return res.status(401).json({ msg: "Usuário não encontrado" });
    }

    req.instrutor = instrutor;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido ou expirado" });
  }
};