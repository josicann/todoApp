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
        text: 'second test todo',
        completed: true,
        completedAt: 333

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
                expect(res.body.doc.text).toBe(text);
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

describe('DELETE /todos/:id', () => {
    it('should delete todo if id is valid', (done) => {
        let id = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc._id).toBe(id);
            }).end((e, res)=> {
                if(e) {
                    return done(e);
                }
                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });
    

    it('should return 404 if id is  not found', (done) => {
        let id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
        .end(done);
    })
    

    it('should return 400 if id is invalid', (done) => {

        request(app)
            .delete(`/todos/12312`)
            .expect(400)
        .end(done);
    });
});

describe('PATCH /todos/:id', ()=> {
    it('should update todo', (done) => {
        let id = todos[0]._id.toHexString();
        let reqBody = {
            text: "new text",
            completed:true
        }

        request(app)
            .patch(`/todos/${id}`)
            .send(reqBody)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(reqBody.text);
                expect(res.body.doc.completed).toBe(true);
                expect(res.body.doc.completedAt).toBeA('number');
            })
            .end((e, res) => {
                if(e){
                    return done(e);
                }
                Todo.findById(id).then((doc) => {
                    expect(doc.text).toBe(reqBody.text);
                    expect(doc.completed).toBe(true);
                    expect(doc.completedAt).toBeA('number');
                    done();
                }).catch((e) => done(e))
            });           
    });

    it('should clear completedAt when not completed', (done) => {
        var id = todos[1]._id.toHexString()
        let reqBody = {
            text: "new text",
            completed:false,
        }
        request(app)
            .patch(`/todos/${id}`)
            .send(reqBody)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc.text).toBe(reqBody.text);
                expect(res.body.doc.completed).toBe(false);
                expect(res.body.doc.completedAt).toNotExist();
            })
            .end(done)
    })
});