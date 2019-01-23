const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User');
const {ObjectID} = require('mongodb');

var id ="5c456e7fa8796aec74a6a7e4";
var userID = "5c430e0831fda3a857f9cf8f";

// if(!ObjectID.isValid(id))
//     console.log('Invalid ID');
// Todo.find({
//     _id:id
// }).then((todos) => {
//     console.log(todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log(todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('id not found');
//     }

// }).catch((e) => console.log(e))

User.findById(userID).then((user) => {
    if(!user) {
        return console.log('user id not found');
    }
    console.log(user);
}).catch((e) => console.log(e))