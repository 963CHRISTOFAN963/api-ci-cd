const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

module.exports = app;
