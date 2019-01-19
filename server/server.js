var {mongoose} = require('./db/mongoose');





var newUser = new User({
    email: "josicann@ut.utm.edu"
});
var newTodo = new Todo({
    text: "Cook Dinner"
});

var anotherTodo = new Todo({
    text: "  ",
    completed: false,
    completedAt: new Date().getTime()
});

// newTodo.save().then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log('unable to save todo');
// });

// anotherTodo.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//     console.log('unable to save todo')
// });

newUser.save().then((doc) => {
    console.log(doc);
}, (e) => {
    console.log('unable to add user to db:', e);
});