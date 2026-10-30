const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No hay token" });
    }

    const token = authHeader.split(" ")[1]; // Quita "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.usuario = decoded; // id, email, rol, EmpresaId
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;