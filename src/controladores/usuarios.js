const pool = require("../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const { rowCount } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount > 0) {
      return res.status(400).json({ mensagem: "esse e-mail já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *",
      [nome, email, senhaCriptografada]
    );

    const { senha: _, ...usuario } = novoUsuario.rows[0];

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarUsuario,
};
