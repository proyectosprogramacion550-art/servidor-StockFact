const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Empresa = require('../models/Empresa');

exports.registrarAdmin = async (req, res) => {
  try {
    const { nombreEmpresa, nit, direccion, telefono, nombreAdmin, email, password } = req.body;
    
    const hashPassword = await bcrypt.hash(password, 10);
    
    const empresa = await Empresa.create({
      nombre: nombreEmpresa,
      nit,
      direccion,
      telefono
    });

    const usuario = await Usuario.create({
      nombre: nombreAdmin,
      email,
      password: hashPassword,
      rol: 'admin',
      EmpresaId: empresa.id
    });

    res.status(201).json({
      mensaje: 'Empresa y Administrador creados correctamente',
      empresa: { id: empresa.id, nombre: empresa.nombre },
      usuario: { id: usuario.id, email: usuario.email, rol: usuario.rol }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }
    
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol, EmpresaId: usuario.EmpresaId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};