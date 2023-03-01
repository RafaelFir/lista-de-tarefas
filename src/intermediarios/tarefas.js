const pool = require("../conexao");

const validarUsuarioETarefa = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.id;
    const idTarefa = req.params.id;

    let tarefas = await pool.query(
      "select t.concluida, l.usuario_id from tarefas t inner join listas l on l.id = t.lista_id where t.id = $1",
      [idTarefa]
    );

    if (tarefas.rowCount < 1) {
      return res.status(404).json({ mensagem: "tarefa não encontrada" });
    }

    if (tarefas.rows[0].usuario_id !== idUsuario) {
      return res.status(401).json({ mensagem: "não autorizado" });
    }

    req.tarefas = tarefas;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = validarUsuarioETarefa;
