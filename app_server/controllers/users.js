const passport = require('passport');
const User = require('../models/usuario');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: '598002869112-3tn1q7blasc131ou9c8sjk0t30o6fs0a.apps.googleusercontent.com',
    clientSecret: 'UBSKZ-zc7I0KsMEzaY9Cd2V-',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function(err,user){
          if(err){
            return cb(err);
          }
          if(user){
            return cb(null,user);
          }
          else{
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.estilo = 'css/lightstyle.css';
            newUser.estiloMapa = '2';
            newUser.save(function(err){
              if(err)
                throw err;
              return cb(null, newUser);
            });
          }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


/*Logout*/
const salir =  function (req, res){
  req.logout();
  res.redirect('/');
};

/*Login facebook*/
const google = passport.authenticate('google', {scope:['profile','email']});

/*Callback facebook*/
const googleCallback =
  function(req, res) {
    res.redirect('/');
  };

/*Auth facebook*/
const googleAuth = passport.authenticate('google', { failureRedirect: '/' });

const setEstilo = function(req, res) {
  User
    .update({_id: req.user._id},{estilo: req.body.estilo, estiloMapa: req.body.estiloMapa},
          {upsert: true, setDefaultOnInsert: true}, (err,user) => {
            if(err)
              res.status(404).json(err);
            else{
              res.status(201).json(user);
            }
          })
}

const getEstilo = function(req,res){
  User
    .findById(req.user._id)
    .exec((err,user) =>{
      if(err)
        res.status(404).json(err);
      else{
        res.status(200).json(user);
      }
    })
}

module.exports = {
  google,
  googleAuth,
  googleCallback,
  salir,
  getEstilo,
  setEstilo
}
