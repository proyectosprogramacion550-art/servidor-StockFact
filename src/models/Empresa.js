const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING
});

module.exports = Empresa;