require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { user, email, password, name } = req?.body;

  if (!user || !password) {
    return res.status(422).json({ message: "Dados incompletos!" });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "Email inválido" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: passwordHash,
    user,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const loginUser = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(422)
      .json({ message: "Usuário e senha são dados obrigatórios" });
  }

  const userExists = await User.findOne({ user });

  if (!userExists) {
    return res.status(500).json({ message: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(password, userExists.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: userExists._id,
      },
      secret
    );

    res.status(200).json({
      status: true,
      message: "Login feito com sucesso!",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userVerify = await User.findById(id, "-password");
    if (userVerify) {
      return res.status(200).json(userVerify);
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Usuário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Usuário não encontrado!" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ _id: id });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, message: "Usuário não encontrado!" });
  }
};

module.exports = { registerUser, loginUser, getUserById, getUsers, deleteUser };
