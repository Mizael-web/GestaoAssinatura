

const express = require("express");
const UsuarioController = require("../controllers/usuarioController");
const AutenticacaoMiddleware = require('../../autenticacao/meddleware/authMeddleware');


const router = express.Router();

// Rotas públicas
router.post("/cadastrar", UsuarioController.cadastrar);
// router.post("/login", UsuarioController.login); // (implemente login se necessário)

// Rotas protegidas
router.get("/usuarios", AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);

module.exports = router;
