import mongoose from "mongoose";

export const AlunoSchema = new mongoose.Schema({
    aluno:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Aluno",
        required:true
    },
    instrutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Instrutor",
        required:true
    },
    dataInicio:{
        type:Date,
        required:true
    },
    dataFinal:{
        type:Date,
        required:true
    },
    UF:{
        type:String,
        required:true
    },
    localAula:{
        type:String,
        required:true
    },
    statusAula:{
        type:String,
        required:true
    }
});