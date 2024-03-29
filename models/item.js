const mongoose =require('mongoose');

const Schema = mongoose.Schema;


const tag = new Schema({
  name:{
    type:String,
    required:true
  }
});
const titles = new Schema({
    name:{
      type:String,
      required:true
    },
    genres:{
      type:String,
      required:true
    },
    episods:[{
      num:String,
      date:Date,
      rating:String,
    }],
    fineshed:String,
    weeklySeen:{
      type:Number,
      default:0
    },
    listAdd:{
      type:Number,
      default:0
    },
    img:{
      type:String,
      required:true
    },
    country:{
      type:String,
      required:true
    },
    tag:{
      type:tag,
      required:true
    },
    ReleaseDate:{
      type:Date,
      required:true
    },
    rating:{
      type:String
    },
    date:Date
  });

  const traillers = new Schema({
      name:{
        type:String,
        required:true
      },
      category:{
        type:String,
        required:true
      },
      link:String,
      date:Date,
      img:{
        type:String,
        required:true
      }
    });
const userSchema = new Schema({
  Username:{
    type:String,
    required:true
  },
  mail:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});
const reviewsSchema = new Schema({
  item:titles,
  rate:{
    type:String,
    required:true
  },
  discripe:{
    type:String,
    required:true
  },
  date:Date,
  user:userSchema,
  vib:Boolean
});

const actor = new Schema({
  name:{
    type:String,
    required:true
  },
  bithDate:{
    type:String,
    required:true
  },
  work:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  date:Date,
  country:{
    type:String,
    required:true
  }
});

const atricle = new Schema({
  title:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  user:{
    type:String,
    required:true
  },
  likes:{
    type:Number,
    default:0
  },
  comments:{
    count:{
      type:Number,
      default:0
    },
    content:[{
      date:Date,
      content:String
    }]
  },
  category:String
});

mongoose.model('titles',titles);
mongoose.model('traillers',traillers);
mongoose.model('reviews',reviewsSchema);
mongoose.model('users',userSchema);
mongoose.model('actors',actor);
mongoose.model('articles',atricle);
mongoose.model('tags',tag);
