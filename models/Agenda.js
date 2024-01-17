// models/Agenda.js
const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
  id_service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  id_create: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  approved: Boolean,
});

const Agenda = mongoose.model("Agenda", agendaSchema);

module.exports = Agenda;
