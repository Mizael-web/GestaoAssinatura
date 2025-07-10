
const express = require('express');
const AssinaturaController = require('../controllers/assinaturaController');
const AutenticacaoMiddleware = require('../middleware/autenticacaoMiddleware');

const router = express.Router();

// Rotas públicas
// router.post("/cadastrar", AssinaturaController.cadastrar);
router.get("/listar", AssinaturaController.listarTodos);
router.post("/criar", AssinaturaController.criarAssinatura);
// router.get("/listar/:id", AssinaturaController.listarPorId);



// Rotas protegidas (exigem autenticação)
router.get("/listar", AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);
// router.delete("/deletar/:id", AutenticacaoMiddleware.autenticarToken, UsuarioController.excluirPorId);
// router.delete("/deletar-todos", AutenticacaoMiddleware.autenticarToken, UsuarioController.excluirTodos);

router.get("/perfil", AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

module.exports = router;


module.exports = router