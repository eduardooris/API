const router = require("express").Router();
const checkToken = require("../helpers/checkToken");
const agendaController = require("../controllers/agendaControllers");
router.get("/", checkToken, agendaController.getAgendas);
router.get("/:id", checkToken, agendaController.getAgendaById);
router.post("/", checkToken, agendaController.createAgenda);
router.delete("/:id", checkToken, agendaController.deleteAgenda);
router.patch("/:id", checkToken, agendaController.updateAgenda);
module.exports = router;
