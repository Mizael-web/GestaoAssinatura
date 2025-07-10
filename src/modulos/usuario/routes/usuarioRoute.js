
const express = require("express");
const UsuarioController = require("../controllers/usuarioController");
const AutenticacaoMiddleware = require("../../../middleware/autenticacaoMiddleware");

const router = express.Router();

// Rotas públicas
router.post("/cadastrar", UsuarioController.cadastrar);
router.get("/listar", UsuarioController.listarTodos);
// router.get("/listar/:id", UsuarioController.listarPorId);

// Rotas protegidas (exigem autenticação)
router.get("/listar", AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);
// router.delete("/deletar/:id", AutenticacaoMiddleware.autenticarToken, UsuarioController.excluirPorId);
// router.delete("/deletar-todos", AutenticacaoMiddleware.autenticarToken, UsuarioController.excluirTodos);

router.get("/perfil", AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

module.exports = router;
