

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Assinatura = sequelize.define('Assinatura', {
  assinante_nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  revista_nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_fim: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ativa', 'cancelada', 'expirada'),
    defaultValue: 'ativa'
  }
  // ❌ NÃO declare o relacionamento belongsTo aqui
}, {
  tableName: 'assinaturas'
});

module.exports = Assinatura;
