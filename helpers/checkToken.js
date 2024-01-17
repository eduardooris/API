require("dotenv").config();
const jwt = require("jsonwebtoken");
function checkToken(req, res, next) {
  const authHeader = req?.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(500).json({ status: false });
  }
}

module.exports = checkToken;
