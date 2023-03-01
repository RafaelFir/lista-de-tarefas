const { Router } = require("express");
const {
  criarLista,
  listarListas,
  excluirLista,
} = require("./controladores/listas");
const login = require("./controladores/login");
const {
  criarTarefa,
  listarTarefasDeUmaLista,
  atualizarTarefa,
  excluirTarefa,
} = require("./controladores/tarefas");
const { cadastrarUsuario } = require("./controladores/usuarios");
const validarUsuarioETarefa = require("./intermediarios/tarefas");
const { validarBodyUsuario } = require("./intermediarios/usuarios");
const {
  verificarUsuariLogado,
} = require("./intermediarios/verificarUsuarioLogado");

const rotas = Router();

rotas.post("/usuario", validarBodyUsuario, cadastrarUsuario);

rotas.post("/login", login);

rotas.use(verificarUsuariLogado);

rotas.post("/lista", criarLista);

rotas.post("/tarefa", criarTarefa);

rotas.get("/lista", listarListas);

rotas.get("/tarefa", listarTarefasDeUmaLista);

rotas.patch("/tarefa/:id", validarUsuarioETarefa, atualizarTarefa);

rotas.delete("/tarefa/:id", validarUsuarioETarefa, excluirTarefa);

rotas.delete("/lista/:id", excluirLista);

module.exports = rotas;
