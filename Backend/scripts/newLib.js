const bcrypt = require("bcryptjs");
const madEx = require("./regexLib");
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collection = db.collection('Lib');

exports.addLib = async (req, res) => {
    if(req.body.content === null || req.body.content == ""
        || req.body.title === null || req.body.title == "") {
        res.redirect('/make');
    } else {
        if(madEx.passOffLib(req.body.content) == 0) {
            res.redirect('/make');
        }
        console.log("newLib method: addLib");
        await client.connect();
        let lib = {
            Title: req.body.title,
            Creator: req.session.user.username,
            LibDescription: "req.body.description",
            Content: req.body.content
        };
        const insertResult = await collection.insertOne(lib);
        console.log(insertResult);
        client.close();
        res.redirect('/profile');
    }
}