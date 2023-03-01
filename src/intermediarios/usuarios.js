const validarBodyUsuario = (req, res, next) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "todos os campos são obrigatórios" });
  }

  next();
};

module.exports = {
  validarBodyUsuario,
};
