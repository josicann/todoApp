// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('successfully connected to mongoDB server');

    // db.collection('Todos').find({
    //     _id : new ObjectID("5c4229702a66f24d0864e040")
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });
    // db.collection('Todos').find({}).count().then((count) => {
    //     console.log("Todos count:", count);
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Users').find({name:"Joshua Cannon"}).toArray().then((docs) =>{
        console.log("User: ", docs);
    }, (err) => {
        console.log('Unable to find user', err)
    });
    db.close();
});