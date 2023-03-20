<div style="text-align:center">
  <h1>Gerenciamento de Despesas Pessoais</h1>
</div>

Busco aplicar o estudo de [arquitetura limpa](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) e [Ports and Adapters](https://alistair.cockburn.us/hexagonal-architecture/).

## Escopo

---

- **Criação de conta de usuário:** permitir que os usuários criem uma conta e façam login na aplicação.
- **Adição de despesas:** permitir que os usuários adicionem despesas, incluindo a descrição, valor, data e categoria.
- **Edição de despesas:** permitir que os usuários editem as despesas existentes.
- **Exclusão de despesas:** permitir que os usuários excluam as despesas existentes.
- **Categorias de despesas:** permitir que os usuários criem e gerenciem suas próprias categorias de despesas.
- **Relatórios de despesas:** permitir que os usuários gerem relatórios de suas despesas, incluindo gráficos e análises simples.
- **Notificações:** permitir que os usuários definam notificações para lembrá-los de datas de vencimento de contas e despesas.
- **Autenticação e segurança:** implementar autenticação segura para contas de usuário e garantir que os dados da despesa sejam protegidos por criptografia.

## Stack

---

Para criação desse projeto utilizamos as seguintes bibliotecas e framework

- [TypeScript](https://www.typescriptlang.org/) - Linguagem fortemente tipada
- [ExpressJS](https://expressjs.com/pt-br/) - Framework para aplicativos web do NodeJS
- [MongoDB](https://www.mongodb.com/) - Banco de dados não relacion (NoSQL) em documentos
- [Eslint](https://eslint.org/) - Analisador de código estático
- [Prettier](https://prettier.io/) - Formatador de código
- [Jest](https://jestjs.io/pt-BR/) - Ferramenta de teste Javascript
- [SonarQube](https://www.sonarqube.org/) - Analizador de código estático
