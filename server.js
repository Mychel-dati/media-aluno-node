const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// rota para exibir o formulário
app.get('/', (req, res) => {
  res.send(`
    <form action="/media" method="post">
      <label>Nome do aluno:</label><br>
      <input type="text" name="nome" required><br><br>

      <label>Nota 1:</label><br>
      <input type="number" name="nota1" step="0.1" required><br><br>

      <label>Nota 2:</label><br>
      <input type="number" name="nota2" step="0.1" required><br><br>

      <button type="submit">Calcular</button>
    </form>
  `);
});

// rota para processar o formulário
app.post('/media', (req, res) => {
  const nome = req.body.nome;
  const nota1 = parseFloat(req.body.nota1);
  const nota2 = parseFloat(req.body.nota2);

  const media = (nota1 + nota2) / 2;

  let situacao;
  if (media >= 6) situacao = 'Aprovado';
  else if (media >= 2) situacao = 'Exame Final';
  else situacao = 'Reprovado';

  res.send(`
    <h2>Resultado</h2>
    <p><b>Nome:</b> ${nome}</p>
    <p><b>Nota 1:</b> ${nota1}</p>
    <p><b>Nota 2:</b> ${nota2}</p>
    <p><b>Média:</b> ${media.toFixed(2)}</p>
    <p><b>Situação:</b> ${situacao}</p>
    <a href="/">Voltar</a>
  `);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
