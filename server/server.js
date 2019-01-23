const express = require('express');
const  bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const port = process.env.PORT || 3000;
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();
app.use(bodyParser.json());


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc) => {
        console.log({doc})
        res.send({doc});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        res.status(400).send();
    }

    Todo.findById(id).then((doc) => {
        if(!doc) {
           return res.status(404).send();
        }
        res.send({doc});
    }).catch((e) =>{
        res.status(404).send();
    });
})

app.delete('/todos/:id', (req, res) => {
    var todoID = req.params.id;

    if(!ObjectID.isValid(todoID)) {
        return res.status(400).send('id invalid');
    }

    Todo.findByIdAndRemove(todoID).then((doc) => {
        if(!doc){
            return res.status(404).send('cannot find that id')
        }

        res.send({doc});
    }).catch((e) => {
        return res.status(400).send('there was an error');
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(400).send('id invalid');
    }

    if(_.isBoolean(body.completed) && true) {
        body.completedAt = new Date().getTime()
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {new: true}).then((doc) => {
        if(!doc) {
            return res.status(404).send();
        }

        res.send({doc})
    }).catch((e) =>{
        res.status(404).send();
    });

})
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});

module.exports = {app};