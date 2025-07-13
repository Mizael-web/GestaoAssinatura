

const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/usuarioModel");
const {
  validarCamposObrigatorios,
  validarEmail,
  validarSenha,
} = require("../../../utils/validarCampos");


class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Verificar campos obrigatórios
      const erroCampos = validarCamposObrigatorios(["nome", "email", "senha"], req.body);
      if (erroCampos) {
        return res.status(400).json({ msg: erroCampos });
      }

      // Validar email
      if (!validarEmail(email)) {
        return res.status(400).json({ msg: "Email inválido!" });
      }

      // Validar senha (mínimo 6 caracteres)
      if (!validarSenha(senha)) {
        return res.status(400).json({ msg: "Senha deve conter pelo menos 6 caracteres." });
      }

      // Verificar se o usuário já existe
      const usuarioExistente = await UsuarioModel.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(409).json({ msg: "Usuário com este e-mail já existe!" });
      }

      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);

      // Criar usuário
      await UsuarioModel.create({ nome, email, senha: senhaHash });

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao criar usuário", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll({
        attributes: { exclude: ["senha"] },
      });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar usuários", erro: error.message });
    }
  }

  static async perfil(req, res) {
    try {
      const { id } = req.usuario; // vem do token JWT via middleware

      const usuario = await UsuarioModel.findByPk(id, {
        attributes: { exclude: ["senha"] },
      });

      if (!usuario) {
        return res.status(404).json({ msg: "Perfil não encontrado." });
      }

      res.status(200).json({ perfil: usuario });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao obter perfil", erro: error.message });
    }
  }
}

module.exports = UsuarioController;
