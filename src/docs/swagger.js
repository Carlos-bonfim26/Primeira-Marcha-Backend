import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Primeira Marcha API",
      version: "1.0.0",
      description: "Documentação da API para o projeto Primeira Marcha",
    },
    servers: [
      {
        url: "https://primeira-marcha-backend.vercel.app",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")], // caminho absoluto
};

export const swaggerSpec = swaggerJSDoc(options);