const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Todoapp',(err, db) => {
  if(err){
    return console.log('Unable to connect');
  }
  console.log('Connection success');
/*
  db.collection('Todos').insertOne({
    text : 'some text here',
    complete : false
  },(err , result) =>  {
      if(err){
        return console.log("Unable to insert");
      }
      console.log(JSON.stringify(result.ops,undefined,2));
  });
*/

  db.collection('Todos').find().toArray().then((docs) =>{
      console.log('Todos');
      console.log(JSON.stringify(docs,undefined,2));
  },(err) => {
    console.log('error');
  });


  db.close();
});
