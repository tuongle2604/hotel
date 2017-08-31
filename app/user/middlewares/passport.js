var LocalStrategy   = require('passport-local').Strategy;
var qr = require('../models/login');

module.exports = function(passport){

  passport.serializeUser(function(results, done) {
    done(null,results);
  });

  passport.deserializeUser(function(results, done) {
    qr.findUserDeserializer(results.id)
      .then(function(results){
        done(null, results);
    }).catch(function(err){
        done('sorry! some thing happened.', null);
    })
  });

  passport.use('local-login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
      },
    function(req,email, password, done) {

      qr.findEmail(email)
        .then(function(results){
          if(results.length===0){
            return qr.catchReject('email')
          }else{
            var pw = qr.decode(results[0].password);
            if(password!==pw){
              return qr.catchReject('password')
            }else{
              return done(null,results[0]);
            }
          }
        }).catch(function(err){
          if(err == 'email' || err =='password'){
            return done(null, false,  req.flash('Message', 'email hoặc password không chính xác'));
          }else{
            return done(null, false,  req.flash('Message', 'sorry! some thing happened.'));
          }
        })

    }
  ));

}
