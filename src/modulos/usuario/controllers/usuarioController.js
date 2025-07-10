

const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/usuarioModel");

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const {id,  nome, email, senha } = req.body;

      if (!id || !nome || !email ||  !senha) {
        return res.status(400).json({ msg: "Todos os campos (id, nome, email, senha) são obrigatórios." });
      }

      const usuarioExistente = await UsuarioModel.findOne({ where: { id } });
      if (usuarioExistente) {
        return res.status(409).json({ msg: "Usuário com essa Id já existe!" });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      await UsuarioModel.create({id,  nome, senha: senhaHash });

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao criar usuário", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll({ attributes: { exclude: ['senha'] } });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar usuários", erro: error.message });
    }
  }

//   static async listarPorId(req, res) {
//     try {
//       const { id } = req.params;
//       const usuario = await UsuarioModel.findOne({ where: { id , attributes: { exclude: ['senha'] } });

//       if (!usuario) {
//         return res.status(404).json({ msg: "Usuário não encontrado." });
//       }

//       res.status(200).json(usuario);
//     } catch (error) {
//       res.status(500).json({ msg: "Erro ao buscar usuário", erro: error.message });
//     }
//   }

//   static async editar(req, res) {
//     try {
//       const { id } = req.params;
//       const { nome, email, senha } = req.body;

//       const usuario = await UsuarioModel.findByPk(id);
//       if (!usuario) {
//         return res.status(404).json({ msg: "Usuário não encontrado." });
//       }

//       const novaSenha = senha ? await bcrypt.hash(senha, 10) : usuario.senha;

//       await UsuarioModel.update({ nome, senha: novaSenha }, { where: { id } });

//       res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
//     } catch (error) {
//       res.status(500).json({ msg: "Erro ao atualizar usuário", erro: error.message });
//     }
//   }

//   static async excluirPorId(req, res) {
//     try {
//       const { senha } = req.params;

//       const usuario = await UsuarioModel.findByPk(senha);
//       if (!usuario) {
//         return res.status(404).json({ msg: "Usuário não encontrado." });
//       }

//       await UsuarioModel.destroy({ where: { senha } });

//       res.status(200).json({ msg: "Usuário excluído com sucesso!" });
//     } catch (error) {
//       res.status(500).json({ msg: "Erro ao excluir usuário", erro: error.message });
//     }
//   }

//   static async excluirTodos(req, res) {
//     try {
//       await UsuarioModel.destroy({ where: {} });
//       res.status(200).json({ msg: "Todos os usuários foram excluídos!" });
//     } catch (error) {
//       res.status(500).json({ msg: "Erro ao excluir todos os usuários", erro: error.message });
//     }
//   }

//   static async perfil(req, res) {
//     try {
//       const { id } = req.usuario; // vem do token (middleware)

//       const usuario = await UsuarioModel.findByPk(id, { attributes: { exclude: ['senha'] } });
//       if (!usuario) {
//         return res.status(404).json({ msg: "Perfil não encontrado" });
//       }

//       res.status(200).json({ perfil: usuario });
//     } catch (error) {
//       res.status(500).json({ msg: "Erro ao obter perfil", erro: error.message });
//     }
//   }
}

module.exports = UsuarioController;
