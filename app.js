const express = require('express');
const app = express();

app.use(express.json());

let frutas = [
  { nome: "maçã", preco: 5 },
  { nome: "banana", preco: 3 },
  { nome: "laranja", preco: 4 }
];

app.get('/', (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

// GET todas as frutas
app.get('/frutas', (req, res) => {
  res.json({ frutas });
});

// GET fruta pelo nome (importante para HEAD funcionar)
app.get('/frutas/:nome', (req, res) => {
  const { nome } = req.params;
  const fruta = frutas.find(f => f.nome.toLowerCase() === nome.toLowerCase());

  if (!fruta) {
    return res.status(404).json({ error: "Fruta não encontrada" });
  }

  res.json(fruta);
});

// POST nova fruta
app.post('/frutas', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }

  frutas.push({ nome, preco });

  res.status(201).json({ message: "Fruta adicionada!", frutas });
});

// DELETE fruta pelo nome
app.delete('/frutas/:nome', (req, res) => {
  const { nome } = req.params;

  const index = frutas.findIndex(f => f.nome.toLowerCase() === nome.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ error: "Fruta não encontrada" });
  }

  frutas.splice(index, 1);

  res.json({ message: "Fruta removida!", frutas });
});

// PUT (atualiza tudo)
app.put('/frutas/:nome', (req, res) => {
  const { nome } = req.params;
  const { novoNome, preco } = req.body;

  const index = frutas.findIndex(f => f.nome.toLowerCase() === nome.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ error: "Fruta não encontrada" });
  }

  if (!novoNome || preco == null) {
    return res.status(400).json({ error: "novoNome e preco são obrigatórios" });
  }

  frutas[index] = { nome: novoNome, preco };

  res.json({ message: "Fruta atualizada completamente!", frutas });
});

// PATCH (atualiza parcialmente)
app.patch('/frutas/:nome', (req, res) => {
  const { nome } = req.params;
  const { novoNome, preco } = req.body;

  const fruta = frutas.find(f => f.nome.toLowerCase() === nome.toLowerCase());

  if (!fruta) {
    return res.status(404).json({ error: "Fruta não encontrada" });
  }

  if (novoNome) fruta.nome = novoNome;
  if (preco != null) fruta.preco = preco;

  res.json({ message: "Fruta atualizada parcialmente!", frutas });
});

module.exports = app;
