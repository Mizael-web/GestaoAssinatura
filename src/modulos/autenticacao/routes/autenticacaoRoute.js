

const express = require('express');
const router = express.Router();

const AutenticacaoController = require('../../autenticacao/controllers/autenticacaoController');

// rota pública de login
router.post('/login', AutenticacaoController.login);

// rota para sair (logout)
router.post('/logout', AutenticacaoController.sair);

// rota usada pelo navegador para atualizar o token
router.post('/refresh-token', AutenticacaoController.refreshToken);

module.exports = router;
