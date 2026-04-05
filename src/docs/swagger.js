import swaggerJSDoc from "swagger-jsdoc";

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
  },
  apis: ["./src/routes/*.js"], // onde estão suas rotas
};

export const swaggerSpec = swaggerJSDoc(options);