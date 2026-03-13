import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Instrutor } from "../models/Instrutor.js";

export const cadastroInstrutor = async (req, res)=>{
const {nome, email, senha, cpf, dataNasc, cidade,  UF, cnh, credencialDetran, valorAula} = req.body;

if(!nome || !email || !senha || !cpf || !dataNasc || !cidade || !UF){
    return res.status(422).json({msg: "Preencha todos os campos"})
}

const instrutorExists = await Instrutor.findOne({email: email});

if(instrutorExists){
    return res.status(422).json({msg:"Esse email já está cadastrado"})
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
    statusInstrutor: "Pendente"
})
try{
    await instrutor.save();
    res.status(201).json({msg:"Usuário cadastrado com sucesso"});
}catch(error){
    res.status(500).json({msg:"Não foi possível cadastrar o usuário, tente novamente mais tarde"});
}
}