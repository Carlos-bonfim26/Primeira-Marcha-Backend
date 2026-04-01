import bcrypt from "bcrypt";
import { Administrador } from "../models/Administrador.js";
import jwt from "jsonwebtoken";

export const cadastroAdministrador = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(422).json({ msg: "Preencha todos os campos" });
  }
  const adminExists = await Administrador.findOne({ email: email });
  if (adminExists) {
    return res.status(422).json({ msg: "Esse email já está cadastrado" });
  }
  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);
  const admin = new Administrador({
    nome,
    email,
    senha: senhaHash,
    type: "admin",
  });
  try {
    await admin.save();
    res.status(201).json({ msg: "Administrador cadastrado com sucesso", admin });
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível cadastrar o administrador, tente novamente mais tarde",
    });
  }
};

export const atualizarAdministrador = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const admin = await Administrador.findById(id);
    if (!admin) {
      return res.status(404).json({ msg: "Administrador não encontrado" });
    }
    if (nome) admin.nome = nome;
    if (email) admin.email = email;
    if (senha) {
      const salt = await bcrypt.genSalt(12);
      admin.senha = await bcrypt.hash(senha, salt);
    }
    await admin.save();
    res.status(200).json({ msg: "Administrador atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível atualizar o administrador, tente novamente mais tarde",
    });
  }
};

export const deletarAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrador.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ msg: "Administrador não encontrado" });
    }
    res.status(200).json({ msg: "Administrador deletado com sucesso" });
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível deletar o administrador, tente novamente mais tarde",
    });
  }
};
export const buscarAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrador.findById(id).select("-senha");;
    if (!admin) {
      return res.status(404).json({ msg: "Administrador não encontrado" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível buscar o administrador, tente novamente mais tarde",
    });
  }
};
export const loginAdministrador = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(422).json({ msg: "Preencha todos os campos" });
  }
  try {
    const admin = await Administrador.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ msg: "Administrador não encontrado" });
    }
    const senhaMatch = await bcrypt.compare(senha, admin.senha);
    if (!senhaMatch) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({ msg: "Login bem-sucedido", admin, token });
  } catch (error) {
    res.status(500).json({
      msg: "Não foi possível realizar o login, tente novamente mais tarde",
    });
  }
};
