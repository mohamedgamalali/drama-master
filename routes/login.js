const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const passport   = require('passport');
const bcrypt = require('bcryptjs');
const router     = express.Router();
require('../models/item');

router.get('/',(req,res)=>
{
  res.render("signin");
});


router.post('/',(req,res,next)=>
{
  console.log("entered post login")
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/signin',
    // failureMessage:true,
    // failureFlash: true
  })(req, res, next);
},(req,res,nexr)=>{
  // req.flash('error_msg', 'invalid user name or password');
});








module.exports = router;
