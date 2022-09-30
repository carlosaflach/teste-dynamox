# Instruções

1. Faça o donwnload do repositório, via SSH ou outro método.
   
2. Abra o projeto na raiz, e no seu terminal rode o comando: `npm install`.
   
3. Após isso, inicie o servidor com o comando: `npm run dev:api`.

4. E para finalizar, inicie a aplicação com o comando: `npm start`.


## Descrição

Este foi um desafio técnico realizado durante o processo seletivo para a empresa Dynamox. </br>
O desafio era criar uma aplicação React para realizar um CRUD de produtos, sendo necessário respeitar alguns requisitos, dentre eles: </br> </br>

* Aplicação deverá ter telas de criação, edição e listagem de produtos, com os campos:
  * Nome.
  * Data de Fabricação.
  * Produto Pericível.
  * Data de Validade.
  * Preço.

* O usuário só deverá ter acesso às rotas de criação, edição e listagem de produtos caso esteja autenticado.
* O usuário só poderá cadastrar data de validade caso o produto seja perecível.
* A data de fabricação nunca deverá ser maior que a data de validade.
* O preço deverá estar em reais (R$).
* A tela de listagem deverá ter a possibilidade de ordenação dos campos e com uma paginação de 10 produtos por página.
* O backend deve ser simulado com json-server, que cria uma API REST fake.
* Requests à API devem simular o envio do token JWT, que também poderá ser fake.
  
### Tecnologias, frameworks e bibliotecas utilizados:

* React.js
* Redux
* Chakra UI
  

## Created By:
- Linkedin - [Carlos A.](https://www.linkedin.com/in/carlosafonsoflach/)



