
const express = require('express');
const router = express.Router();

const AssinaturaController = require('../controllers/assinaturaController');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware'); // Caminho corrigido

// Rotas protegidas (JWT obrigatório)
router.get('/', AutenticacaoMiddleware.autenticarToken, AssinaturaController.listarTodos);
router.get('/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.listarPorId);
router.post('/', AutenticacaoMiddleware.autenticarToken, AssinaturaController.criar);
router.put('/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.editar);
router.delete('/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.excluirPorId);

module.exports = router;
