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
require('./app_server/models/db');

//Obteniendo Rutas
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_server/routes/api');

//passport
//requiere('./app_server/controllers/users')(passport);

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
app.use(apiRouter);
app.use(usersRouter);
app.use(indexRouter);

//Error de siempre
app.get('/favicon.ico', (req, res) => res.status(204));

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

module.exports = app;
