# GestaoAssinatura

# GestaoAssinatura

📘 Projeto: Gestão de Assinaturas – API Node.js
API RESTful desenvolvida com Node.js, Express e Sequelize, conectada ao PostgreSQL, com suporte a autenticação via JWT, validações, e controle de usuários e assinaturas.

✅ Funcionalidades
🔐 Autenticação com JWT (Access Token + Refresh Token)

👥 Cadastro e login de usuários

📚 CRUD de Assinaturas

🔎 Middleware de autenticação

🔒 Senhas criptografadas com bcrypt

✅ Validação de campos obrigatórios

🧱 Estrutura de Pastas
lua
Copiar
Editar
├\---src
    +---config
    |       configDB.js
    |       
    +---modulos
    |   +---assinatura
    |   |   +---controllers
    |   |   |       assinaturaController.js
    |   |   |       
    |   |   +---meddleware
    |   |   |       assinaturaMeddleware.js
    |   |   |
    |   |   +---models
    |   |   |       assinaturaModel.js
    |   |   |
    |   |   \---routes
    |   |           assinaturaRoute.js
    |   |
    |   +---autenticacao
    |   |   +---controllers
    |   |   |       autenticacaoController.js
    |   |   |
    |   |   +---meddleware
    |   |   |       authMeddleware.js
    |   |   |
    |   |   \---routes
    |   |           autenticacaoRoute.js
    |   |
    |   \---usuario
    |       +---controllers
    |       |       usuarioController.js
    |       |
    |       +---meddleware
    |       |       usuarioMeddleware.js
    |       |
    |       +---models
    |       |       usuarioModel.js
    |       |
    |       \---routes
    |               usuarioRoute.js
    |
    \---utils
            validarCampos.js
🔧 Tecnologias utilizadas
Node.js

Express

PostgreSQL

Sequelize ORM

bcryptjs

dotenv

cors

jsonwebtoken

nodemon (dev)

⚙️ Variáveis de Ambiente .env
Crie um arquivo .env na raiz com o seguinte conteúdo:

env
Copiar
Editar
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=db_gestaoassinatura
DB_PASSWORD=SuaSenhaAqui
DB_PORT=5432

PORTA=3001
NODE_ENV=development

TEMPO_ACESS_TOKEN="2m"
TEMPO_REFRESH_TOKEN="24h"
SECRET_KEY=SuaChaveSecretaJWT
JWT_REFRESH_SECRET=OutraChaveRefreshToken
▶️ Como rodar o projeto
bash
Copiar
Editar
# Instale as dependências
npm install

# Inicie o projeto
npm run dev
O servidor estará rodando em: http://localhost:3001

📡 Endpoints principais
🧑 Usuário
Método	Rota	Ação	Autenticado
POST	/api/cadastrar	Cadastrar usuário	❌
POST	/api/login	Login e gerar token	❌
GET	/api/perfil	Ver perfil do usuário	✅
GET	/api/listar	Listar todos usuários	✅

🗞️ Assinatura
Método	Rota	Ação	Autenticado
GET	/api/assinaturas	Listar assinaturas	✅
GET	/api/assinaturas/:id	Obter assinatura por ID	✅
POST	/api/assinaturas	Criar nova assinatura	✅
PUT	/api/assinaturas/:id	Atualizar assinatura	✅
DELETE	/api/assinaturas/:id	Excluir assinatura por ID	✅

🔐 Middleware de Autenticação
Use o middleware autenticacaoMiddleware.js nas rotas que precisam proteger com JWT:

js
Copiar
Editar
const AutenticacaoMiddleware = require('./middleware/autenticacaoMiddleware');

router.get("/perfil", AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);
🧪 Testando com Insomnia/Postman
Envie o token no header:

css
Copiar
Editar
Authorization: Bearer {seu_token_jwt}
📌 Autor
Desenvolvido por [Mizael]
