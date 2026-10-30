const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/registrar-admin", authController.registrarAdmin);
router.post("/login", authController.login);

module.exports = router;