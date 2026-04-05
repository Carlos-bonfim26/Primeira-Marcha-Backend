# 🚗 Primeira Marcha — Backend

Plataforma que conecta **instrutores autônomos de autoescola** a **estudantes** que buscam aulas de direção. Instrutores podem divulgar seus serviços e definir seu valor por aula; estudantes encontram instrutores disponíveis na sua cidade e agendam aulas diretamente pela plataforma.

## 🔗 Links

- **API em produção:** https://primeira-marcha-backend.vercel.app
- **Documentação interativa (Swagger):** https://primeira-marcha-backend.vercel.app/api-docs/

---

## 🛠 Tecnologias

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📁 Estrutura do projeto

```
├── App.js                  # Entrada da aplicação
├── vercel.json             # Configuração de deploy
└── src/
    ├── config/
    │   └── db.js           # Conexão com MongoDB
    ├── controllers/        # Lógica de negócio
    ├── middleware/
    │   └── auth.js         # Autenticação JWT
    ├── models/             # Schemas Mongoose
    ├── routes/             # Rotas da API
    └── docs/
        └── swagger.js      # Configuração do Swagger
```

---

## ⚙️ Rodando localmente

**Pré-requisitos:** Node.js 18+ e uma instância do MongoDB (local ou Atlas)

**1. Clone o repositório**
```bash
git clone https://github.com/Carlos-bonfim26/Primeira-Marcha-Backend.git
cd Primeira-Marcha-Backend
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_secret_jwt
```

**4. Inicie o servidor**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000` e a documentação em `http://localhost:3000/api-docs`.

---

## 🔐 Autenticação

As rotas protegidas utilizam **JWT (JSON Web Token)**. Após o login, inclua o token no header das requisições:

```
Authorization: Bearer <seu_token>
```

---

## 📦 Módulos da API

| Módulo | Descrição |
|---|---|
| **Instrutor** | Cadastro, login, busca por cidade, aprovação e gerenciamento de instrutores |
| **Aluno** | Cadastro, login e gerenciamento de alunos |
| **Aula** | Agendamento, cancelamento, reagendamento e controle de status das aulas |
| **Administrador** | Gerenciamento administrativo da plataforma |

Para detalhes de cada endpoint (parâmetros, body, respostas), consulte a [documentação Swagger](https://primeira-marcha-backend.vercel.app/api-docs/).