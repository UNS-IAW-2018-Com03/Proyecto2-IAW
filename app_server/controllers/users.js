const passport = require('passport');
const User = require('../models/usuario');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: '598002869112-3tn1q7blasc131ou9c8sjk0t30o6fs0a.apps.googleusercontent.com',
    clientSecret: 'UBSKZ-zc7I0KsMEzaY9Cd2V-',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    profileFields: ['id','displayName','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function(err,user){
          if(err)
            return cb(err);
          if(user)
            return cb(null,user);
          else
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.email[0].value;
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

/*Login facebook*/
const google = passport.authenticate('google', {scope:['profile','email']});

/*Callback facebook*/
const googleCallback =
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  };

/*Auth facebook*/
const googleAuth = passport.authenticate('google', { failureRedirect: '/login' });

module.exports = {
  google,
  googleAuth,
  googleCallback,
  salir
}
