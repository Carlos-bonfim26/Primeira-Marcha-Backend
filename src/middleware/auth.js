import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: "Token não fornecido." });
  }

  try {
    const secret = process.env.JWT_SECRET;

    const verified = jwt.verify(token, secret);

    req.user = verified;

    next();
  } catch (error) {
    console.log("Erro na validação do JWT:", error.message);
    res.status(401).json({ msg: "Token inválido ou expirado!" });
  }
};