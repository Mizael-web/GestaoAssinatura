

const bcrypt = require("bcryptjs");
const AssinaturaModel = require("../models/assinaturaModel");

class AssinaturaController {
  static async criar(req, res) {
    try {
      const { nome_assinante, email, senha, nome_revista, data_incio, data_fim, status } = req.body;

      if (!nome_assinante || !email || !senha || !nome_revista || !data_incio || !data_fim || !status) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
      }

      // Criptografar a senha
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const item = await AssinaturaModel.create({
        nome_assinante,
        email,
        senha: senhaCriptografada,
        nome_revista,
        data_incio,
        data_fim,
        status,
      });

      res.status(201).json({ msg: "Assinatura criada com sucesso", item });
    } catch (error) {
      console.error("Erro criar item:", error);
      res.status(500).json({ msg: "Erro ao criar assinatura", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const itens = await AssinaturaModel.findAll({
        attributes: { exclude: ["senha"] }, // remove a senha da resposta
      });
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar", erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await AssinaturaModel.findOne({
        where: { id },
        attributes: { exclude: ["senha"] },
      });

      if (!item) {
        return res.status(404).json({ msg: "Item não encontrado." });
      }

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar item", erro: error.message });
    }
  }

  static async editar(req, res) {
    try {
      const { id } = req.params;
      const { nome_assinante, email, senha, nome_revista, data_incio, data_fim, status } = req.body;

      const item = await AssinaturaModel.findOne({ where: { id } });
      if (!item) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      const novaSenha = senha ? await bcrypt.hash(senha, 10) : item.senha;

      await AssinaturaModel.update(
        {
          nome_assinante,
          email,
          senha: novaSenha,
          nome_revista,
          data_incio,
          data_fim,
          status,
        },
        { where: { id } }
      );

      const itemAtualizado = await AssinaturaModel.findOne({ where: { id }, attributes: { exclude: ["senha"] } });

      res.status(200).json({ msg: "Assinatura atualizada com sucesso", item: itemAtualizado });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar assinatura", erro: error.message });
    }
  }

  static async excluirPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await AssinaturaModel.findByPk(id);

      if (!item) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      await AssinaturaModel.destroy({ where: { id } });

      res.status(200).json({ msg: "Assinatura excluída com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao excluir assinatura", erro: error.message });
    }
  }
}

module.exports = AssinaturaController;

