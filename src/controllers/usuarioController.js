const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

// Listar todos los usuarios de mi empresa
exports.listarTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { EmpresaId: req.usuario.EmpresaId },
      attributes: { exclude: ["password"] }
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nuevo usuario (solo admin)
exports.crearUsuario = async (req, res) => {
  try {
    if (req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Solo el administrador puede crear usuarios" });
    }

    const { nombre, email, password, rol } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashPassword,
      rol: rol || "usuario",
      EmpresaId: req.usuario.EmpresaId
    });

    const { password: _, ...usuarioSinContraseña } = usuario.toJSON();
    res.status(201).json(usuarioSinContraseña);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};