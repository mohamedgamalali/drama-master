const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const passport   = require('passport');
const router     = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/../public/uploads/imgs'});
require('../models/item');

router.get('/imghandle',(req,res)=>
{

  res.render('imghandle');
});
router.post('/imghandle', upload.single('imgg'), (req, res) => {
    if(req.file) {
      console.log(req.file.url);
        res.json(req.file);
    }
    else throw 'error';
});

router.post('/articles',(req,res)=>
{
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
