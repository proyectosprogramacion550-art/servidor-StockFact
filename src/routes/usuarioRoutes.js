const router = require("express").Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // Todas protegidas con token

router.get("/", usuarioController.listarTodos);
router.post("/", usuarioController.crearUsuario);

module.exports = router;