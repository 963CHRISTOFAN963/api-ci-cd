const express = require('express');
const app = express();

app.use(express.json());

let frutas = ["maçã", "banana", "laranja"];

app.get('/', (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// Endpoint de frutas
app.get('/frutas', (req, res) => {
  res.json({ frutas });
});

app.post('/frutas', (req, res) => {
  const { nome } = req.body;
  if(!nome) return res.status(400).json({ error: "É necessário informar o nome da fruta" });
  frutas.push(nome);
  res.status(201).json({ message: `Fruta ${nome} adicionada!`, frutas });
});

module.exports = app;
