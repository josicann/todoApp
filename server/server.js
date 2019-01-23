var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
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
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findById(id).then((doc) => {
        if(!doc) {
            res.status(404).send();
        }
        res.send({doc});
    }).catch((e) =>{
        res.status(404).send();
    });
})
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});

module.exports = {app};