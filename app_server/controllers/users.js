const passport = require('passport');
const User = require('../models/usuario');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '212363842696111',
    clientSecret: 'f42645dbba1e3e3d6f4393c99bde6e81',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id','displayName','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
      User.findOne({'facebook.id': profile.id}, function(err,user){
          if(err)
            return cb(err);
          if(user)
            return cb(null,user);
          else
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.name.givenName +' '+ profile.name.familyName;
            newUser.facebook.email = profile.email[0].value;
            newUser.save(function(err){
              if(err)
                throw err;
              return done(null, newUser);
            });
      });
    });
  }
));


/*Logout*/
const salir =  function (req, res){
  req.logout();
  res.redirect('/');
};

/*Login*/
const ingresar = function(req,res){

};


const facebook = passport.authenticate('facebook');

const facebookCallback =
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  };


const facebookAuth = passport.authenticate('facebook', { failureRedirect: '/login' });

module.exports = {
  facebook,
  facebookAuth,
  facebookCallback,
  salir,
  ingresar
}
