
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const AssinaturaModel = sequelize.define(  "Assinatura",  {
    nome_assinante: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
                msg:'É permitido apenas letras!'
            }
        }
      },
      email:{     
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email inválido" },
      }
    },

            
    // matricula: {
    //   type: DataTypes.STRING,
    //   primaryKey: true,
    //   validate: {
    //     is: {
    //       args: /^[A-Za-z]\d{8}$/,
    //       msg: "A matricula deve iniciar com uma letra e ter 8 números!",
    //     },
    //   },
    // },
  
    nome_revista: {  
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
                msg:'É permitido apenas letras!'
            },
        },
      },
    // senha: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validade: {
    //     is: {
    //       args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //       msg: "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.",
    //     },
  
    data_incio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Data de início inválida" },
        },
        },
    
       data_fim: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
           isDate: { msg: "Data de fim inválida" },
         }
       },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["enum:ativa", "cancelada", "expirada", "padrao: ativa"]],
          msg: "Status deve ser: enum:ativa, cancelada, expirada ou padrao: ativa.",
        },
      },
    }
  },
  {
    tableName: "assinatura",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);



module.exports = AssinaturaModel;