const express = require('express');
const app = express();
const morgan = require('morgan');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const bodyParser = require('body-parser')

//Obteniendo Rutas
const routes = require('./routes/routes');

//Settings
app.set('appName','R&R Solutions');
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(expressSession({secret: 'max', saveUnitialized: false, resave: false}));

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
