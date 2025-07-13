

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Carrega variáveis de ambiente
dotenv.config();

// Configuração do banco de dados e Sequelize
const { sequelize } = require('./src/config/configDB');

// Models (para definir relacionamentos)
const Usuario = require('./src/modulos/usuario/models/usuarioModel');
const Assinatura = require('./src/modulos/assinatura/models/assinaturaModel');

// Define o relacionamento (1:N) entre Usuario e Assinatura
Usuario.hasMany(Assinatura, {
  foreignKey: 'usuario_id',
  as: 'assinaturas' // Alias para o lado do usuário
});

Assinatura.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario' // Alias para o lado da assinatura (⚠️ usar apenas aqui!)
});

// Importação das rotas
const authRoute = require('./src/modulos/autenticacao/routes/autenticacaoRoute');
const usuarioRoute = require('./src/modulos/usuario/routes/usuarioRoute');
const assinaturaRoute = require('./src/modulos/assinatura/routes/assinaturaRoute');

// Criação do app Express
const app = express();

// Configuração do CORS (liberar para o frontend React)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware para ler JSON no corpo da requisição
app.use(express.json());

// Definição das rotas
app.use('/api/auth', authRoute);           // login, logout, refresh-token
app.use('/api/usuarios', usuarioRoute);    // cadastro, listagem, etc.
app.use('/api/assinaturas', assinaturaRoute); // CRUD de assinaturas (protegido)

// Middleware global de erro
app.use((err, req, res, next) => {
  console.error('[Erro Global]:', err.stack);
  res.status(500).json({ msg: 'Erro interno do servidor', erro: err.message });
});

// Inicialização do servidor
const PORTA = process.env.PORTA || 3001;

app.listen(PORTA, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    const isDev = process.env.NODE_ENV === 'development';
    await sequelize.sync({ force: isDev, alter: !isDev });
    console.log('✅ Banco de dados sincronizado com sucesso.');

    console.log(`🚀 Servidor rodando na porta ${PORTA}`);
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', err);
  }
});
