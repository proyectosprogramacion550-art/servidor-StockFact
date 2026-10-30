require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

require('./src/models/Empresa');
require('./src/models/Usuario');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    res.send('✅ Servidor StockFact funcionando - Base de datos conectada');
  } catch (err) {
    console.error(err);
    res.send('❌ Error de conexión: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});