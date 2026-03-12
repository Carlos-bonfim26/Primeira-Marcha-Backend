import express from "express"
import mongoose from "mongoose"; 
const hostname = "127.0.0.1";
const port = 3000;
const app = express();
// config JSON
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({msg:"Passo inicial da primeira marcha"})
})
app.listen(3000);

app.listen(port, hostname,()=>{
console.log(`Servidor rodando em http://${hostname}:${port}/`);
})