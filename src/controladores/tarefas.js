const pool = require("../conexao");

const criarTarefa = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const { descricao, lista_id } = req.body;

    const lista = await pool.query("select * from listas where id = $1", [
      lista_id,
    ]);

    if (lista.rows[0].usuario_id !== idUsuario) {
      return res.status(401).json({ mensagem: "Acesso não autorizado" });
    }

    const tarefa = await pool.query(
      "insert into tarefas (tarefa, lista_id) values ($1, $2) returning *",
      [descricao, lista_id]
    );

    const tarefas = await pool.query(
      "select * from tarefas where lista_id = $1",
      [lista_id]
    );

    const listaTarefa = {
      lista: lista.rows[0],
      tarefas: tarefas.rows,
    };

    return res.status(201).json(listaTarefa);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarTarefasDeUmaLista = async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const { lista_id } = req.body;

    const lista = await pool.query("select * from listas where id = $1", [
      lista_id,
    ]);

    if (lista.rows[0].usuario_id !== idUsuario) {
      return res.status(401).json({ mensagem: "Acesso não autorizado" });
    }

    const tarefas = await pool.query(
      "select id, tarefa, concluida from tarefas where lista_id = $1",
      [lista_id]
    );

    const listaTarefa = {
      lista: lista.rows[0],
      tarefas: tarefas.rows,
    };

    return res.status(201).json(listaTarefa);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const atualizarTarefa = async (req, res) => {
  try {
    // const idUsuario = req.usuario.id;
    const idTarefa = req.params.id;
    const { marcarDesmarcar, descricao } = req.body;
    let tarefas = req.tarefas;

    if (marcarDesmarcar === "sim") {
      if (tarefas.rows[0].concluida) {
        tarefas = await pool.query(
          "update tarefas set concluida = $1 where id = $2 returning *",
          [false, idTarefa]
        );
      } else {
        tarefas = await pool.query(
          "update tarefas set concluida = $1 where id = $2 returning *",
          [true, idTarefa]
        );
      }
    }

    if (descricao) {
      tarefas = await pool.query(
        "update tarefas set tarefa = $1 where id = $2 returning *",
        [descricao, idTarefa]
      );
    }

    return res.json(tarefas.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const excluirTarefa = async (req, res) => {
  // const idUsuario = req.usuario.id;
  const idTarefa = req.params.id;

  await pool.query("delete from tarefas where id = $1", [idTarefa]);

  return res.status(204).send();
};

module.exports = {
  criarTarefa,
  listarTarefasDeUmaLista,
  atualizarTarefa,
  excluirTarefa,
};
