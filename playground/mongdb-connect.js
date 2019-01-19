// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('successfully connected to mongoDB server');

    // db.collection('Todos').insertOne({
    //     text: "something to do",
    //     completed : false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Error writing to database', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: "Joshua Cannon",
    //     age : 27,
    //     location: "Bon Aqua, TN"
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Error writing to database', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});