const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtsController");

//middleware
const checkAuth = require("../middleware/auth").checkAuth;

router.get("/add", checkAuth, ToughtController.createToughts);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.get("/", ToughtController.showToughts);

module.exports = router;
