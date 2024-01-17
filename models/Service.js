// models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: String,
  price: Number,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
