// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('successfully connected to mongoDB server');

    db.collection('Users').findOneAndUpdate({_id: new ObjectID("5c422e56bc4b3f481090ae4d")}, {
        $set: {
            name : "Joshua Cannon"
        },
        $inc : {
            age : 1   
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    db.close();
});