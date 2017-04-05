
const express = require('express');
const bodyParser = require('body-parser');

var { mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');



var port = process.PORT || 3005;

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  var newTodo = new Todo({
    text : req.body.text
  });

  newTodo.save().then((result) =>{
    res.send(result);
  },(e) => {
    res.status(400).send(e);
  });
});

app.listen(port,() => {
  console.log(`started on port ${port}`);
});


module.exports = {app};
