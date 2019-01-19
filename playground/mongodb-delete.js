// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('successfully connected to mongoDB server');

    // delete many
    // db.collection('Users').deleteMany({name: 'Joshua Cannon'}).then((res) => {
    //     console.log(res);
    // });
    //delete one 
    // db.collection('Todos').deleteOne({text: 'something to do'}).then((res) => {
    //     console.log(res);
    // });   
    //find one and delete
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("5c422b896f10734f8cbc052e")})
    .then((res) => {
        console.log(res);
    });
    db.close();
});