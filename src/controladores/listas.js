const pool = require("../conexao");

const criarLista = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const { descricao } = req.body;

    const lista = await pool.query(
      "insert into listas (descricao, usuario_id) values ($1, $2) returning *",
      [descricao, idUsuario]
    );

    return res.status(201).json(lista.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarListas = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;

    const listas = await pool.query(
      "select * from listas where usuario_id = $1",
      [idUsuario]
    );

    return res.status(201).json(listas.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirLista = async (req, res) => {
  const idUsuario = req.usuario.id;
  const lista_id = req.params.id;

  console.log(1);

  const { rows, rowCount } = await pool.query(
    "select * from listas where id = $1",
    [lista_id]
  );
  console.log(2);
  if (rowCount < 1) {
    return res.status(404).json({ mensagem: "lista não encontrada" });
  }

  if (rows[0].usuario_id !== idUsuario) {
    return res.status(401).json({ mensagem: "não autorizado" });
  }

  await pool.query("delete from tarefas where lista_id = $1", [lista_id]);
  await pool.query("delete from listas where id = $1", [lista_id]);

  return res.status(204).send();
};

module.exports = {
  criarLista,
  listarListas,
  excluirLista,
};
