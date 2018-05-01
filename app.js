const express = require('express');
const createError = require('http-errors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');

//Obteniendo Rutas
const index = require('./app_server/routes/index');
const signUp = require('./app_server/routes/users');

//Settings
app.set('appName','R&R Solutions');
app.set('views',path.join(__dirname, 'app_server','views'));
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(session({secret: 'anystringoftext',
                        saveUnitialized: true,
                        resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Directorio Publico
app.use(express.static(path.join(__dirname, '/public')));

//Rutas
app.use(signUp);
app.use(index);

//404 not Found
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('Servidor Funcionando.');
  console.log('Nombre de la App: ',app.get('appName'));
});

module.exports = app;
