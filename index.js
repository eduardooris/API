const express = require("express");
const mongoose = require("mongoose");
const agendasRoutes = require("./routes/agendasRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/agendas", agendasRoutes);
app.use("/users", authRoutes);
app.use("/services", serviceRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const port = process.env.PORT ?? 3000;
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@consruwise.n7x9yo3.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected");
    app.listen(port);
  })
  .catch((err) => console.log(err));
