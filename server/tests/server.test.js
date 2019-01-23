var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/Todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'first test todo'
    }, {
        _id: new ObjectID(),
        text: 'second test todo'
    }];
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done())
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((e, res) => {
                if(e){
                    return done(e);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            });
    });

    it('should not create a todo with bad data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((e, res) => {
                if(e) {
                    return done(e);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done();
                }).catch((e) => done(e))
            });
    });
});

describe('GET /todos', ()=>{
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
                expect(res.body.todos[0].text).toBe(todos[0].text)
            })
            .end(done)
    });
});

describe('GET /todos/:id', () => {
    it('should get a todo with given id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(todos[0].text);
            })
        .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        var testID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${testID}`)
            .expect(404)
        .end(done);
    })

    it('should return 400 if id is invalid', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(400)
        .end(done);
    });
});