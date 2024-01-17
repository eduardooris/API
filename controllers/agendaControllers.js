// controllers/agendaController.js
const Agenda = require("../models/Agenda");
const mongoose = require("mongoose");
const getAgendas = async (req, res) => {
  try {
    const result = await Agenda.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "id_service",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "id_create",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          name: "$creator.name",
          sobrenome: "$creator.sobrenome",
          service: "$service.service",
          price: "$service.price",
          createdAt: "$date",
          approved: "$approved",
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAgenda = async (req, res) => {
  const { id_create, id_service, date } = req.body;

  if (!id_create || !id_service) {
    return res.status(422).json({ status: false, message: "Dados incompleto" });
  }

  const agenda = {
    id_create,
    id_service,
    date: new Date(),
    approved: false,
  };

  try {
    await Agenda.create(agenda);
    res
      .status(200)
      .json({ status: true, message: "Agendamento feito com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Erro ao agendar!" });
  }
};

const getAgendaById = async (req, res) => {
  const agendaId = req.params.id;

  try {
    const result = await Agenda.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(agendaId) },
      },
      {
        $lookup: {
          from: "services",
          localField: "id_service",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "id_create",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$service",
      },
      {
        $unwind: "$creator",
      },
      {
        $project: {
          _id: "$_id",
          name: "$creator.name",
          sobrenome: "$creator.sobrenome",
          service: "$service.service",
          price: "$service.price",
          createdAt: "$date",
          approved: "$approved",
        },
      },
      {
        $limit: 1,
      },
    ]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Agendamento não encontrado!" });
  }
};

const updateAgenda = async (req, res) => {
  const { id } = req?.params;
  const { approved, id_service } = req.body;

  if (!approved && !id_service) {
    return res
      .status(400)
      .json({ status: false, message: "Campos incompletos!" });
  }

  const agenda = {
    approved,
    id_service,
  };

  try {
    const updateAgenda = await Agenda.updateOne({ _id: id }, agenda);
    if (updateAgenda.matchedCount == 0) {
      res.status(200).json({ message: "Não foi possível atualizar!" });
      return;
    }
    res.status(200).json(updateAgenda);
  } catch (error) {
    res.status(500).json({ status: false, message: "Agenda não encontrada!" });
  }
};

const deleteAgenda = async (req, res) => {
  const { id } = req?.params;
  try {
    await Agenda.deleteOne({ _id: id });
    res.status(200).json({ message: "Agenda removido com sucesso" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Agenda não encontrado" });
  }
};

module.exports = {
  getAgendas,
  createAgenda,
  getAgendaById,
  deleteAgenda,
  updateAgenda,
};
