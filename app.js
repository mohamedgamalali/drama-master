const express    = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose   = require('mongoose');
const passport   = require('passport');
// const flash = require('connect-flash');

const app = express();

//mongoose posomise
mongoose.Promise = global.Promise;
//mongo connect
mongoose.connect('mongodb://localhost:27017/moviNews', {
    useNewUrlParser: true
}).then(()=>{console.log("mongo is ready..");}).catch((err)=>{console.log(err);})

require('./models/item');

require('./config/passport')(passport);

// Handlebars Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// flash midllewere
// app.use(function(req, res, next){
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.failureMessage='invalid user name or password';
//     res.locals.user = req.user || null;
//     next();
// });

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//routs
const home = require('./routes/home');
const articles = require('./routes/articles');
const filter = require('./routes/filter');
const signup = require('./routes/signup');
const signin = require('./routes/login');

app.use(passport.initialize());
app.use(passport.session());

//bring models
const titles = mongoose.model('titles');
const traillers = mongoose.model('traillers');
const reviews = mongoose.model('reviews');
const users = mongoose.model('users');
const actor = mongoose.model('actors');

  // const insert = new tvShows({
  //   name:"new tvshow",
  //   fineshed:"no",
  //   weeklySeen:2,
  //   img:"imgs",
  //   category:"horror"
  // });
  // insert.save();

app.get('/',(req,res)=>
{

  //getting the new episods
  titles.find({genres:"drama"||"drama special"||"tv shows",fineshed:"no"}).then((item)=>{
  var trending = item;
  let l = [];
  item.forEach((i)=>
  {
    l.push(i.episods.length-1);
  });

  //getting reviews


  //getting the new trallers
  traillers.find({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
    console.log(post);
    reviews.find({}, {}, { sort: { 'date' : -1 } }, function(err2, review) {
      if(err2)console.log(err2);
      else {
          titles.find({}, {}, { sort: { 'weeklySeen' : -1 } }, function(err3, trinding) {
            if(err3)console.log(err3);
            else {
              // console.log(trinding);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = yyyy + '-' + dd + '-' + mm;

                    actor.find({bithDate:today}).then((actor)=>{
                        titles.find({genres:"drama"||"drama special"||"tv shows",fineshed:"no"}, {}, { sort: { 'listAdd' : -1 } }, function(err5, mostWatch) {
                            titles.find({genres:"drama"||"drama special"||"tv shows"}, {}, { sort: { 'listAdd' : -1 } }, function(err6, topShow) {

                              console.log(actor);
                              res.render("index",{l:l,last:item,lastTr:post,reviews:review,trinding:trinding,actorBirthday:actor,today:dd+" / "+mm,mostWatch:mostWatch,topShow:topShow});
                            });
                          });
                    }).catch((err4)=>{console.log(err4);});
            }
          });
      }
    });
  });

  }).catch((err)=>{console.log(err);});


});
app.get('/auth',(req,res)=>{
  if(req.isAuthenticated()){
    res.send("hello"+req.user);
  }
  else{
    res.send("not outh");
  }
});

app.use('/home',home);
app.use('/articles',articles);
app.use('/filter',filter);
app.use('/signin',signin);
app.use('/signup',signup);

const port = process.env.PORT || 3000 ;

app.listen(port,()=>
{
  console.log(`listen you ${port}`);
});

//news plog api key e853357cbff6449786ca58d98c621d5b
