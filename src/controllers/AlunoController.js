import mongoose from "mongoose";
import { Aluno } from "../models/Aluno.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const cadastroAluno = async (req, res) => {
    const { nome, email, senha, cpf, dataNasc, cidade, UF } = req.body;

    if (!nome || !email || !senha || !cpf || !dataNasc || !cidade || !UF) {
        return res.status(422).json({ msg: "Preencha todos os campos" })
    }

    const alunoExists = await Aluno.findOne({ email: email });

    if (alunoExists) {
        return res.status(422).json({ msg: "Esse email já está cadastrado" })
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const aluno = new Aluno({
        nome,
        email,
        senha: senhaHash,
        cpf,
        dataNasc,
        cidade,
        UF
    })
    try {
        await aluno.save();
        res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Não foi possível cadastrar o usuário, tente novamente mais tarde" });
    }
};

export const atualizarAluno = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        const aluno = await Aluno.findById(id);
        if (!aluno) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        if (nome) aluno.nome = nome;
        if (email) aluno.email = email;
        if (senha) {
            const salt = await bcrypt.genSalt(12);
            aluno.senha = await bcrypt.hash(senha, salt);
        }

        await aluno.save();
        res.status(200).json({ msg: "Aluno atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar aluno" });
    }
};

export const deletarAluno = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await Aluno.findByIdAndDelete(id);
        if (!aluno) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }
        res.status(200).json({ msg: "Aluno deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar aluno" });
    }
};
export const buscarAluno = async (req, res) => {
    const { id } = req.params;
    try {
        const aluno = await Aluno.findById(id).select("-senha"); // Remove a senha do retorno por segurança
        if (!aluno) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar aluno" });
    }
};
export const buscarAlunoPorCPF = async (req, res) => {
    const { cpf } = req.params;
    try {
        const aluno = await Aluno.findOne({ cpf }).select("-senha"); // Remove a senha do retorno por segurança
        if (!aluno) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar aluno" });
    }
};

export const loginAluno = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(422).json({ msg: "Preencha todos os campos" });
    }

    try {
        const aluno = await Aluno.findOne({ email });
        if (!aluno) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        const senhaMatch = await bcrypt.compare(senha, aluno.senha);
        if (!senhaMatch) {
            return res.status(401).json({ msg: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: aluno._id, email: aluno.email },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );

        res.status(200).json({ msg: "Login bem-sucedido", aluno, token });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao realizar login" });
    }
};