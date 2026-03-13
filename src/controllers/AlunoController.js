import mongoose from "mongoose";
import {Aluno} from "../models/Aluno.js"
import bcrypt from "bcrypt"

export const cadastroAluno = async (req, res)=>{
const {nome, email, senha, cpf, dataNasc, cidade,  UF} = req.body;

if(!nome || !email || !senha || !cpf || !dataNasc || !cidade || !UF){
    return res.status(422).json({msg: "Preencha todos os campos"})
}

const alunoExists = await Aluno.findOne({email: email});

if(alunoExists){
    return res.status(422).json({msg:"Esse email já está cadastrado"})
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
try{
    await aluno.save();
    res.status(201).json({msg:"Usuário cadastrado com sucesso"});
}catch(error){
    res.status(500).json({msg:"Não foi possível cadastrar o usuário, tente novamente mais tarde"});
}
}