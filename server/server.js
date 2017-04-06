

const express = require('express');
const bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var { mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');



var port = process.env.PORT || 3005;

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


app.get('/todos',(req,res) => {
  Todo.find().then((todos)=>{
    res.send({
      todos
    })
  });
});

app.get('/todos/:id',(req,res) => {
  var id = req.params.id;
  if(ObjectID.isValid(id)){
    Todo.findById(id).then((user) => {
      if(!user){
        return res.status(404).send('prob');
      }
      res.status(200).send(user);
    },(e) => {
      res.status(400).send();
    });
  }else {
    res.status(404).send('prob');
  }
});

app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send(todo);
  });


});

app.listen(port,() => {
  console.log(`started on port ${port}`);
});


module.exports = {app};
