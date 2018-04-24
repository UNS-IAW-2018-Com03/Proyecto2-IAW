const express = require('express');
const app = express();
const morgan = require('morgan');

//Obteniendo Rutas
const routes = require('./routes');

//Settings
app.set('appName','R&R Solutions');
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));

//Rutas
app.use(routes);

//Directorio Publico
app.use(express.static(__dirname + '/public'));

//Lo Dejo aca?
app.get('*', (req, res) => {
  res.end('Archivo No Encontrado.');
})

app.listen(3000, () => {
  console.log('Servidor Funcionando.');
  console.log('Nombre de la App: ',app.get('appName'));
});
