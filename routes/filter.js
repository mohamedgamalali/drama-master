const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const passport   = require('passport');
const router     = express.Router();
require('../models/item');
const article = mongoose.model('articles');
const traillers = mongoose.model('traillers');
const tags = mongoose.model('tags');
const titles = mongoose.model('titles');
const actor = mongoose.model('actors');

// const insert = new actor({
//   name:"fff",
//   bithDate:"date",
//   work:"alal",
//   img:"photo",
//   date:Date.now(),
//   country:"country"
// });
// insert.save();

router.post('/articles', (req, res) => {
  console.log(req.body);
  article.find({'category': {$in:req.body.category}}, {}, { sort: { 'req.body.groupOfDefaultRadios3':-1} }, function(err, artFind) {
    article.find({}, {}, { sort: { 'date':-1} }, function(err, newart) {
      traillers.find({}, {}, { sort: { 'date':-1} }, function(err, newTreller) {
        tags.find({}).then((tag)=>
        {
          console.log(artFind);
          res.render('Articles',{art:artFind,newart:newart,newTreller:newTreller,tag:tag});
        }).catch(error=>{console.log(error);});

      });
    });
  });
});

router.post('/item',(req,res)=>{

    titles.find({'genres':{$in:req.body.genres}}).then(data=>
    {
      console.log(data);
      console.log(req.body.genres);
    }).catch(err=>{console.log(err);});

});

router.post("/people",(req,res)=>
{
  const contryArr = req.body.country;
  console.log(req.body);
  if(req.body.country){

    actor.find({country: {$in:req.body.country}}, {}, { sort: { 'req.body.groupOfDefaultRadios3':-1} }, function(err, actor) {
      console.log(actor);
      res.json(actor);
    });

  }
  else {
    actor.find({}, {}, { sort: { 'req.body.groupOfDefaultRadios3':-1} }, function(err, actor) {
      console.log(actor);
      res.json(actor);
    });
  }

});

module.exports = router;
