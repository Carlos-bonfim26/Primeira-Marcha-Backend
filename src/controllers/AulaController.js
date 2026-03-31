import { Aula } from "../models/Aula.js";

export const marcarAula = async (req, res) => {
  const { aluno, instrutor, dataInicio, dataFinal, UF, localAula } = req.body;

  if (!aluno || !instrutor || !dataInicio || !dataFinal || !UF || !localAula) {
    return res.status(422).json({ msg: "Preencha todos os campos" });
  }

  try {
    const conflito = await Aula.findOne({
      instrutor,
      statusAula: { $in: ["pendente", "agendada"] },
      $or: [
        {
          dataInicio: { $lt: new Date(dataFinal) },
          dataFinal: { $gt: new Date(dataInicio) },
        },
      ],
    });

    if (conflito) {
      return res.status(409).json({
        msg: "Instrutor já possui uma aula nesse horário",
      });
    }

    const aula = new Aula({
      aluno,
      instrutor,
      dataInicio,
      dataFinal,
      UF,
      localAula,
      statusAula: "pendente",
    });

    await aula.save();
    res.status(201).json(aula);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelarAula = async (req, res) => {
  const { id } = req.params;
  try {
    const aula = await Aula.findById(id);
    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }
    aula.statusAula = "cancelada";
    await aula.save();
    res.status(200).json({ msg: "Aula cancelada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao cancelar aula" });
  }
};

export const concluirAula = async (req, res) => {
  const { id } = req.params;
  try {
    const aula = await Aula.findById(id);
    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }
    aula.statusAula = "concluída";
    await aula.save();
    res.status(200).json({ msg: "Aula concluída com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao concluir aula" });
  }
};

export const buscarAula = async (req, res) => {
  const { id } = req.params;
  try {
    const aula = await Aula.findById(id);
    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }
    res.status(200).json(aula);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar aula" });
  }
};

export const listarAulasAluno = async (req, res) => {
  const { alunoId } = req.params;
  try {
    const aulas = await Aula.find({ aluno: alunoId });
    res.status(200).json(aulas);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar aulas do aluno" });
  }
};

export const listarAulasInstrutor = async (req, res) => {
  const { instrutorId } = req.params;
  try {
    const aulas = await Aula.find({ instrutor: instrutorId });
    res.status(200).json(aulas);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar aulas do instrutor" });
  }
};

export const aceitarAula = async (req, res) => {
  const { id } = req.params;
  try {
    const aula = await Aula.findById(id);
    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }
    aula.statusAula = "agendada";
    await aula.save();
    res.status(200).json({ msg: "Aula aceita com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao aceitar aula" });
  }
};

export const recusarAula = async (req, res) => {
  const { id } = req.params;
  try {
    const aula = await Aula.findById(id);
    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }
    aula.statusAula = "recusada";
    await aula.save();
    res.status(200).json({ msg: "Aula recusada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao recusar aula" });
    }
};

export const reagendarAula = async (req, res) => {
  const { id } = req.params;
  const { dataInicio, dataFinal } = req.body;

  try {
    const aula = await Aula.findById(id);

    if (!aula) {
      return res.status(404).json({ msg: "Aula não encontrada" });
    }

    const novoInicio = dataInicio || aula.dataInicio;
    const novoFinal = dataFinal || aula.dataFinal;

    const conflito = await Aula.findOne({
      _id: { $ne: id },
      instrutor: aula.instrutor,
      statusAula: { $in: ["pendente", "agendada"] },
      $or: [
        {
          dataInicio: { $lt: new Date(novoFinal) },
          dataFinal: { $gt: new Date(novoInicio) },
        },
      ],
    });

    if (conflito) {
      return res.status(409).json({
        msg: "Novo horário entra em conflito com outra aula",
      });
    }

    aula.dataInicio = novoInicio;
    aula.dataFinal = novoFinal;
    aula.statusAula = "reagendada";

    await aula.save();

    res.status(200).json({ msg: "Aula reagendada com sucesso" });

  } catch (error) {
    res.status(500).json({ msg: "Erro ao reagendar aula" });
  }
};
