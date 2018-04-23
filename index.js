const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('Holi!');
})

app.listen(3000, () => {
  console.log('Servidor Funcionando.')
});
