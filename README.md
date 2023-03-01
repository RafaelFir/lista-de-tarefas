# lista-de-tarefas

API RESTful em Node

## Descrição

Este é um projeto para criar uma API RESTful simples em Node.js com autenticação de usuário e senha encriptada.
Nela foram usadas: express, jsonwebtokem, bcrypt, pg.

Nela é possível criar:

Usuários com autenticação.
listas de tarefas, que somente o próprio usuário pode visualizá-las e editá-las.

## Instalação

1. Clone este repositório: `git clone https://github.com/seu-usuario/seu-projeto.git`
2. Entre no diretório do projeto: `cd seu-projeto`
3. Instale as dependências: `npm install`
4. Execute o projeto: `npm run dev`

## Como Usar

Para usar a API, basta enviar solicitações HTTP para os endpoints disponíveis.

### Endpoints

Aqui estão os endpoints disponíveis na API:

- `POST /usuario`: Cria um novo usuário com base nos dados fornecidos no corpo da solicitação.
- `POST /login`: Faz o login do usuário com base nos dados fornecidos no corpo da solicitação.
- `POST /lista`: Cria uma nova lista.
- `POST /tarefa`: Cria uma nova tarefa.
- `GET /lista`: Retorna as listas do usuário.
- `GET /tarefa`: Retorna as tarefas de uma lista do usuário.
- `PATCH /tarefa/:id`: Atualiza as informações da tarefa com o id da terefa.
- `DELETE /tarefa/:id`: Exclui uma tarefa com o id da tarefa.
- `DELETE /lista/:id`: Exclui uma lista com o id da lista.

Para usar a API, envie solicitações HTTP para esses endpoints usando um cliente HTTP, como o [Postman](https://www.postman.com/) ou o [cURL](https://curl.se/).

## Contato

Se você tiver alguma dúvida ou sugestão sobre este projeto, sinta-se à vontade para entrar em contato comigo através do meu perfil no GitHub: [@seu-usuario](https://github.com/seu-usuario).
