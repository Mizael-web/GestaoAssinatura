

const jwt = require("jsonwebtoken");

class AutenticacaoMiddleware {
  static autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    // Verifica se o token tem o formato correto "Bearer TOKEN"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token de acesso não fornecido!" });
    }

    const token = authHeader.split(" ")[1]; // Extrai o token após "Bearer"

    jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {
      if (err) {
        return res.status(403).json({ msg: "Token de acesso inválido ou expirado!" });
      }

      req.usuario = usuario; // Passa os dados do token para os próximos middlewares
      next();
    });
  }
}

module.exports = AutenticacaoMiddleware;
