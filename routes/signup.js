const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const bcrypt = require('bcryptjs');
const passport   = require('passport');
const router     = express.Router();

require('../models/item');
const users = mongoose.model('users');

var error="";

// const newuser = new users({
//   Username:"mohamed",
//   mail:'gamal',
//   password:'ali'
// });
// newuser.save();

router.get('/',(req,res)=>
{
  res.render("signup",{error:error});
});

router.post("/",(req,res)=>{
  if(req.body.password.length<4){
    error="password must be 8 chars or more";
    res.render('signup',{error:error});
  }
  else {
    users.findOne({mail:req.body.mail}).then((mail)=>
    {
      if(!mail){
        const newuser = new users({
          Username:req.body.user,
          mail:req.body.mail,
          password:req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newuser.password, salt, (err, hash) => {
              if(err) throw err;
              newuser.password = hash;
              newuser.save()
                .then(user => {
                  res.redirect('/signin');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });

      }
      else {
        res.redirect('/signin');
      }
    });
  }
});








module.exports = router;
