
const express = require("express");
const UsuarioController = require("../controllers/usuarioController");
const AutenticacaoMiddleware = require('../../autenticacao/meddleware/authMeddleware');

const router = express.Router();

// Rotas públicas
router.post("/cadastrar", UsuarioController.cadastrar);
router.post("/login", UsuarioController.login); // ✅ ADICIONE ESTA LINHA
// rota perfil - protegida por token JWT
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

// rota para listar todos (opcional)
router.get('/', AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);

// Rota protegida (exemplo)
router.get("/usuarios", AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);

module.exports = router;
