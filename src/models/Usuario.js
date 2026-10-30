const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empresa = require('./Empresa');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('admin', 'usuario'),
    defaultValue: 'usuario'
  }
});

Usuario.belongsTo(Empresa);
Empresa.hasMany(Usuario);

module.exports = Usuario;