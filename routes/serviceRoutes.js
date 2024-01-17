const router = require("express").Router();
const checkToken = require("../helpers/checkToken");
const serviceController = require("../controllers/serviceControllers");

router.get("/", checkToken, serviceController.getServices);
router.get("/:id", checkToken, serviceController.getServiceById);
router.post("/", checkToken, serviceController.createService);
router.patch("/:id", checkToken, serviceController.updateService);
router.delete("/:id", checkToken, serviceController.deleteService);

module.exports = router;
