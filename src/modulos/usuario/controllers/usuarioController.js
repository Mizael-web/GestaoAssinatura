
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

class UsuarioController {
  // ✅ Cadastrar usuário
  static async cadastrar(req, res) {
    try {
      const { nome, papel, email, senha } = req.body;

      if (!nome ||!papel || !email || !senha ) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
      }

      const emailExiste = await Usuario.findOne({ where: { email } });
      if (emailExiste) {
        return res.status(409).json({ msg: 'Email já cadastrado' });
      }


           // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await Usuario.create({ nome, papel, email, senha: senhaCriptografada });
      res.status(200).json({ msg: 'Usuario criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  } 

  // ✅ Login
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
      }

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ msg: 'Senha incorreta' });
      }

      const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).json({
        msg: 'Login realizado com sucesso',
        token
      });
    } catch (err) {
      return res.status(500).json({ msg: 'Erro ao fazer login', erro: err.message });
    }
  }

  // ✅ Perfil do usuário autenticado
  static async perfil(req, res) {
    try {
      const { id } = req.usuario; // Vem do middleware de autenticação

      const usuario = await Usuario.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'papel']
      });

      if (!usuario) {
        return res.status(404).json({ msg: 'Perfil não encontrado' });
      }

      return res.status(200).json(usuario);
    } catch (err) {
      return res.status(500).json({ msg: 'Erro ao buscar perfil', erro: err.message });
    }
  }

  // ✅ Listar todos os usuários
  static async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email', 'papel']
      });
      return res.status(200).json(usuarios);
    } catch (err) {
      return res.status(500).json({ msg: 'Erro ao listar usuários', erro: err.message });
    }
  }
}

module.exports = UsuarioController;
