require("dotenv").config();
const authControllers = require("../controllers/authControllers");
const checkToken = require("../helpers/checkToken");
const router = require("express").Router();

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.get("/:id", checkToken, authControllers.getUserById);
router.get("/", checkToken, authControllers.getUsers);
router.delete("/:id", checkToken, authControllers.deleteUser);
module.exports = router;
