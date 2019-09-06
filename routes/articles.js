const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const passport   = require('passport');
const router     = express.Router();
require('../models/item');
const article = mongoose.model('articles');
const traillers = mongoose.model('traillers');
const tags = mongoose.model('tags');

// const insert = new tags({
//   name:"horror"
// });
// insert.save();

router.get('/',(req,res)=>
{
  article.find({}, {}, { sort: { 'comments.count':-1} }, function(err, art) {
    article.find({}, {}, { sort: { 'date':-1} }, function(err, newart) {
      traillers.find({}, {}, { sort: { 'date':-1} }, function(err, newTreller) {
        tags.find({}).then((tag)=>
        {
          res.render('Articles',{art:art,newart:newart,newTreller:newTreller,tag:tag});
        }).catch(error=>{console.log(error);});

      });
    });

  });
});



module.exports = router;
