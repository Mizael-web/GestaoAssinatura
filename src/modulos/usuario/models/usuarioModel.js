

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDB');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // ❌ NÃO declare hasMany aqui
}, {
  tableName: 'usuarios'
});

module.exports = Usuario;
