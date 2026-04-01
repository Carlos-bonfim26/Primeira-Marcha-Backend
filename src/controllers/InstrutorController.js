import bcrypt from "bcrypt";
import { Instrutor } from "../models/Instrutor.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
export const cadastroInstrutor = async (req, res) => {
  const {
    nome,
    email,
    senha,
    cpf,
    dataNasc,
    cidade,
    UF,
    cnh,
    credencialDetran,
    valorAula,
  } = req.body;

  if (!nome || !email || !senha || !cpf || !dataNasc || !cidade || !UF) {
    return res.status(422).json({ msg: "Preencha todos os campos" });
  }

  const instrutorExists = await Instrutor.findOne({ email: email });

  if (instrutorExists) {
    return res.status(422).json({ msg: "Esse email já está cadastrado" });
  }

  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  const instrutor = new Instrutor({
    nome,
    email,
    senha: senhaHash,
    cpf,
    dataNasc,
    cidade,
    UF,
    cnh,
    credencialDetran,
    valorAula,
    statusInstrutor: "Pendente",
  });
  try {
    await instrutor.save();
    res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível cadastrar o usuário, tente novamente mais tarde",
    });
  }
};
export const listarInstrutores = async (req, res) => {
  try {
    const instrutores = await Instrutor.find();
    res.status(200).json(instrutores);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar instrutores" });
  }
};

export const atualizarStatusInstrutor = async (req, res) => {
  const { id } = req.params;
  const { statusInstrutor } = req.body;
  try {
    const instrutor = await Instrutor.findByIdAndUpdate(
      id,
      { statusInstrutor },
      { new: true },
    );
    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }
    res.status(200).json(instrutor);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar status do instrutor" });
  }
};

export const deletarInstrutor = async (req, res) => {
  const { id } = req.params;
  try {
    const instrutor = await Instrutor.findByIdAndDelete(id);
    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }
    res.status(200).json({ msg: "Instrutor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar instrutor" });
  }
};

export const buscarInstrutorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const instrutor = await Instrutor.findById(id).select("-senha");;
    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }
    res.status(200).json(instrutor);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar instrutor por ID" });
  }
};

export const buscarInstrutorPorCidade = async (req, res) => {
  const { cidade } = req.params;
  try {
    const instrutores = await Instrutor.find({ cidade: cidade });
    res.status(200).json(instrutores);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar instrutores por cidade" });
  }
};

export const atualizarValorAula = async (req, res) => {
  const { id } = req.params;
  const { valorAula } = req.body;
  try {
    const instrutor = await Instrutor.findByIdAndUpdate(
      id,
      { valorAula },
      { new: true },
    );
    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }
    res.status(200).json(instrutor);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar valor da aula" });
  }
};

export const atualizarInstrutor = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    senha,
    cpf,
    dataNasc,
    cidade,
    UF,
    cnh,
    credencialDetran,
    valorAula,
  } = req.body;
  try {
    const instrutor = await Instrutor.findByIdAndUpdate(
      id,
      {
        nome,
        email,
        senha,
        cpf,
        dataNasc,
        cidade,
        UF,
        cnh,
        credencialDetran,
        valorAula,
      },
      { new: true },
    );
    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }
    res.status(200).json(instrutor);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar instrutor" });
  }
};
export const aprovarInstrutor = async (req, res) => {
  const { cpf } = req.params;
  try {
    if (!cpf) {
      return res.status(422).json({ msg: "CPF é obrigatório" });
    }

    const response = await axios.get(
      `https://data-instrutores-api.vercel.app/instrutores?cpf=${cpf}`,
    );
    const instrutorData = response.data;
    console.log(instrutorData);
    const instrutorValido = instrutorData.find((inst) => inst["CPF"] === cpf);
    if (!instrutorValido) {
      return res
        .status(404)
        .json({ msg: "Instrutor não encontrado na base de dados do Detran" });
    }
    const instrutorAtualizado = await Instrutor.findOneAndUpdate(
      { cpf: cpf },
      { statusInstrutor: "Aprovado" },
      { new: true },
    );
    if (!instrutorAtualizado) {
      return res
        .status(404)
        .json({ msg: "Instrutor não encontrado no sistema para aprovação" });
    }
    res.status(200).json({
      msg: "Instrutor aprovado com sucesso",
      instrutor: instrutorAtualizado,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao aprovar instrutor" });
    console.error(error);
  }
};
export const aprovarInstrutorInterno = async (cpf) => {
  try {
    if (!cpf) {
      return res.status(422).json({ msg: "CPF é obrigatório" });
    }

    const response = await axios.get(
      `https://data-instrutores-api.vercel.app/instrutores?cpf=${cpf}`,
    );
    const instrutorData = response.data;

    const instrutorValido = instrutorData.find((inst) => inst["CPF"] === cpf);
    if (!instrutorValido) {
      return res
        .status(404)
        .json({ msg: "Instrutor não encontrado na base de dados do Detran" });
    }
    const instrutorAtualizado = await Instrutor.findOneAndUpdate(
      { cpf: cpf },
      { statusInstrutor: "Aprovado" },
      { new: true },
    );
    if (!instrutorAtualizado) {
      return res
        .status(404)
        .json({ msg: "Instrutor não encontrado no sistema para aprovação" });
    }
    res.status(200).json({
      msg: "Instrutor aprovado com sucesso",
      instrutor: instrutorAtualizado,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao aprovar instrutor" });
    console.error(error);
  }
};
export const loginInstrutor = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(422).json({ msg: "Preencha todos os campos" });
    }

    const instrutor = await Instrutor.findOne({ email });

    if (!instrutor) {
      return res.status(404).json({ msg: "Instrutor não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, instrutor.senha);

    if (!senhaValida) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: instrutor._id, email: instrutor.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      msg: "Login bem-sucedido",
      instrutor: {
        id: instrutor._id,
        nome: instrutor.nome,
        email: instrutor.email,
        statusInstrutor: instrutor.statusInstrutor,
      },
      token,
    });
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
    return res.status(500).json({ msg: "Erro ao realizar login" });
  }
};
