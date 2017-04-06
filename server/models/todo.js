const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text : {
    type : String,
    required : true,
    trim  : true,
    minlenght : 1
  },
  completed : {
    type : Boolean
  },
  completedAt : {
    type : Number
  }
});


module.exports = {Todo};
