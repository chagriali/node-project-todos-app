const expect = require('expect');
const supertest = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


var todos = [{
  text : "some text here"
},{
  text : "some text here2"
}];


beforeEach((done) => {
  Todo.remove({}).then(() =>{
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('Post /todos',() => {
  it('sould create a new todo',(done) => {
    var text = 'some text to do test';
    supertest(app)
    .post('/todos')
    .send({
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text)
    })
    .end((err , res) => {
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos) =>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});



describe('Get /todos',() =>{
    it('should get data',(done) =>{
      supertest(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {

          expect(res.body.todos.length).toBe(2);
      })
      .end(done);
    });
});
