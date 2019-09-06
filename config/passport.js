const LocalStrategy = require('passport-local').Strategy;
const mongoose   = require('mongoose');
const bcrypt = require('bcryptjs');


require('../models/item');
const User = mongoose.model('users');

module.exports  =  function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  console.log("enter passport")
  // Match user
  console.log(email);
  User.findOne({
    mail:email
  }).then(user => {
    console.log("user searched")
    console.log(user);
    if(!user){
      console.log("no user")

      return done(null, false, {message: 'No User Found'});
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        return done(null, user);
      } else {
        console.log("incorrect pass")

        return done(null, false, {message: 'Password Incorrect'});
      }
    })
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


}
