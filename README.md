<h2 align="left">Project Store Manager</h2>

<p>Este é um repositório contendo um projeto de gerenciamento de lojas criado com Node.js, Express e MySQL.</p>

<h3>Tecnologias utilizadas</h3>


- Node.js: ambiente de execução JavaScript do lado do servidor
- Express: framework para construção de aplicativos web
- MySQL: sistema de gerenciamento de banco de dados relacional
- JWT: JSON Web Tokens, um padrão para autenticação e autorização baseado em tokens criptografados


<h3>Funcionalidades</h3>

<li>Cadastro de usuários com diferentes níveis de acesso</li>
<li>Cadastro, edição e remoção de produtos</li>
<li>Cadastro, edição e remoção de categorias</li>
<li>Registro de vendas</li>
<li>Visualização de relatórios de vendas</li>

<h3>Autenticação e autorização</h3>

O projeto utiliza o JWT para autenticação e autorização de usuários. Quando um usuário se registra ou faz login, um token JWT é gerado e enviado ao cliente. Esse token contém informações sobre o usuário, como seu ID e nível de acesso. O token é então usado para autenticar solicitações do cliente ao servidor, permitindo que o servidor verifique se o usuário tem as permissões necessárias para acessar a funcionalidade solicitada.

<h3>Como instalar localmente</h3>

Para instalar e executar o projeto localmente, siga estas etapas:

<li>Clone este repositório:</li>
git clone https://github.com/viitormalves/store-manager.git

<br></br>

<li>Instale as dependências do projeto:</li>
cd store-manager
npm install

<br></br>

<li>Configure as variáveis de ambiente:</li>
- Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:

- PORT=3000;

- DB_HOST=localhost;

- DB_USER=seu_usuario_mysql;

- DB_PASSWORD=sua_senha_mysql;

- DB_NAME=store_manager;

- JWT_SECRET=seu_segredo_jwt.

<br></br>

<li>Inicie o servidor:</li>
npm start

<br></br>

<li>Execute os testes:</li>
npm test

<br></br>

<li>O servidor estará disponível em http://localhost:3000.</li>
