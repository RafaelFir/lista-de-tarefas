const app = require("./servidor");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
