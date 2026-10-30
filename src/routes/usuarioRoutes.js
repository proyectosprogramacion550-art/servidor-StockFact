const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");

// Todas las rutas protegidas con token
router.use(authMiddleware);

router.get("/", usuarioController.listarTodos);
router.post("/", usuarioController.crearUsuario);

module.exports = router;