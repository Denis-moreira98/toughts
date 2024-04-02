const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtsController");

//middleware
const checkAuth = require("../middleware/auth").checkAuth;

router.get("/add", checkAuth, ToughtController.createToughts);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
router.post("/edit", checkAuth, ToughtController.updateToughtSave);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/", ToughtController.showToughts);

module.exports = router;
