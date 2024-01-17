// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  id_agenda: { type: mongoose.Schema.Types.ObjectId, ref: "Agenda" },
  amount: Number,
  payment_date: Date,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
