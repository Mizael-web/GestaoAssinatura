

const bcrypt = require("bcryptjs");
const AssinaturaModel = require("../models/assinaturaModel");

class AssinaturaController {
  static async criar(req, res) {
    try {
      const { nome_assinante, email, nome_revista, data_incio,  data_fim, status  } = req.body;
      if (!nome_assinante || !email || !nome_revista || !data_incio || !data_fim || !status) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos !" });
      }
      const item = await Assinatura.create({
        nome_assinante,
        email,
        nome_revista,
        data_incio,
        data_fim,
        status
      });
        res.status(201).json({ msg: "Item criado com sucesso", item });
    } catch (error) {
      console.error("Erro criar item:", error);
      res.status(500).json({ msg: "Erro ao criar item", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const itens = await Assinatura.findAll();
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar", erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await Assinatura.findOne(id);

      if (!item) {
        return res.status(404).json({ msg: "Item não encontrado." });
      }

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar item", erro: error.message });
    }
  }



  static async editarPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await Assinatura.findOne(id);
      if (!item) {
        return res.status(404).json({ msg: "Item não encontrado." });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar item", erro: error.message });
    }
  }

  // static async editar(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const {  nome_assinante, email, nome_revista, data_incio,  data_fim, status } = req.body;

  //     if (!nome_assinante && !email && !nome_revista && !data_incio && !data_fim && !status) {
  //       return res.status(400).json({ msg: "Nenhum campo para atualizar foi enviado." });
  //     }

  //     const [linhasAfetadas] = await Assinatura.update(req.body, { where: { id } });

  //     if (linhasAfetadas === 0) {
  //       return res.status(404).json({ msg: "Item não encontrado ou dados inalterados" });
  //     }
  //      const itemAtualizado = await Assinatura.findByPk(id);

  //     res.status(200).json({ msg: "Item atualizado com sucesso", item: itemAtualizado });
  //   } catch (error) {
  //     console.error("Erro atualizar item:", error);
  //     res.status(500).json({ msg: "Erro ao atualizar", erro: error.message });
  //   }
  // }


  static async excluirPorId(req, res) {
    try {
      const {id } = req.params;

      const item = await Assinatura.findByPk(id);
      if (!item) {
        return res.status(404).json({ msg: "Item não encontrado." });
      }
      
      res.status(200).json({ msg: "Item excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao excluir item", erro: error.message });
    }
  }

  // static async excluirTodos(req, res) {
  //   try {
  //     await UsuarioModel.destroy({ where: {} });
  //     res.status(200).json({ msg: "Todos os usuários foram excluídos!" });
  //   } catch (error) {
  //     res.status(500).json({ msg: "Erro ao excluir todos os usuários", erro: error.message });
  //   }
  // }

  // static async perfil(req, res) {
  //   try {
  //     const { id } = req.usuario; // vem do token (middleware)

  //     const usuario = await UsuarioModel.findByPk(id, { attributes: { exclude: ['senha'] } });
  //     if (!usuario) {
  //       return res.status(404).json({ msg: "Perfil não encontrado" });
  //     }

  //     res.status(200).json({ perfil: usuario });
  //   } catch (error) {
  //     res.status(500).json({ msg: "Erro ao obter perfil", erro: error.message });
    }
  }
}

module.exports = UsuarioController;
