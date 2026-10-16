📚 BookStore Manager (Node.js & MySQL Connection Pool)

Aplicação Web Full-Stack desenvolvida em Node.js com arquitetura orientada a microsserviços/módulos, utilizando Express, Handlebars (Template Engine) e banco de dados relacional MySQL.

Este projeto foi construído com foco em boas práticas de engenharia de software, segurança contra vulnerabilidades web e performance de banco de dados.

🚀 Tecnologias e Conceitos Destacados

Node.js & Express: Framework robusto para construção da API e rotas de roteamento web (Server-Side Rendering).

MySQL Connection Pool (mysql.createPool): Substituição de conexões isoladas por um pool gerenciado. O pool gerencia e reaproveita conexões abertas, limitando acessos simultâneos e otimizando drasticamente a performance sob alta carga de requisições.

Variáveis de Ambiente (.env): Proteção de credenciais sensíveis do banco de dados (Host, Usuário, Senha, Porta) utilizando a biblioteca dotenv.

Prevenção contra SQL Injection: Uso rigoroso de queries parametrizadas com placeholders (?) em todas as operações de banco de dados (SELECT, INSERT, UPDATE, DELETE).

Handlebars: Renderização eficiente de páginas HTML dinâmicas no servidor.

Bootstrap 5 & Custom CSS: Interface moderna, totalmente responsiva, estilizada com animações fluidas, efeitos glassmorphism e micro-interações.

⚙️ Arquitetura e Estrutura de Pastas

livros-nodejs-connectionpool-mysql/
├── db/
│   └── conn.js          # Módulo exportado de conexão via Connection Pool (.env)
├── public/
│   ├── css/
│   │   └── style.css    # Estilização customizada e animações CSS
│   └── images/
│       └── livro.jpg    # Ativos estáticos
├── views/
│   ├── layouts/
│   │   └── main.handlebars # Layout global (Navbar e Footer)
│   ├── home.handlebars     # Formulário de cadastro
│   ├── livros.handlebars   # Listagem e acervo geral
│   ├── livro.handlebars    # Visualização de item único
│   └── editarlivro.handlebars # Formulário de edição
├── index.js             # Arquivo principal do servidor Express
├── package.json         # Dependências do projeto
└── .env.example         # Exemplo de configuração de variáveis de ambiente


🛠️ Como Executar o Projeto Localmente

Clone o repositório:

git clone https://github.com/valdecirwm/bookstorage-mysql-nodejs
cd livros-nodejs-connectionpool-mysql


Instale as dependências:

npm install


Configure as Variáveis de Ambiente:
Crie um arquivo .env na raiz do projeto com base nas seguintes chaves:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=nodemysql
DB_CONNECTION_LIMIT=10


Inicie o servidor:

npm run dev
# ou
node index.js


Acesse no navegador: http://localhost:3000

👨‍💻 Autor

Desenvolvido por Valdecir DEV como parte do portfólio profissional para demonstração de competências em Backend com Node.js e Bancos de Dados Relacionais.