
const express = require("express");
const UsuarioController = require("../controllers/usuarioController");
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

const router = express.Router();

// Rotas públicas
router.post("/cadastrar", UsuarioController.cadastrar);
router.post("/login", UsuarioController.login);

// Rota de perfil - protegida por token JWT
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

// Rota para listar todos (opcional)
router.get('/', AutenticacaoMiddleware.autenticarToken, UsuarioController.listar);

// Rota protegida (exemplo)
router.get("/usuarios", AutenticacaoMiddleware.autenticarToken, UsuarioController.listar);

// Rota de tarefa (acesso restrito)
router.get( '/listar-tarefa',  AutenticacaoMiddleware.autenticarToken,  AutorizacaoMiddleware.autorizar(['assinatura']),
  UsuarioController.listar);

module.exports = router;
