create database lista_tarefas;

create table usuarios (
  id serial primary key not null,
  nome text,
  email text unique,
  senha text
);

create table listas (
  id serial primary key not null,
  descricao text,
  usuario_id integer references usuarios(id)
);

create table tarefas (
  id serial primary key not null,
  tarefa text,
  concluida boolean default false,
  lista_id integer references listas(id)
)