const bcrypt = require("bcryptjs");
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collection = db.collection('LibUser');

let salt = bcrypt.genSaltSync(10);

exports.addUser = async (req, res) => {
    if(req.body.password === null || req.body.password == "" || req.body.password != req.body.confPass) {
        res.redirect('/join');
    } else {
        console.log("newUser method: addUser");
        await client.connect();
        if (await collection.findOne({ "UserName": req.body.username })) {
            res.redirect('/join');
        }
        let hash = bcrypt.hashSync(req.body.password, salt);
        let user = {
            UserName: req.body.username,
            Password: hash,
            Description: req.body.bio,
            pfp: req.body.pfp
        };
        const insertResult = await collection.insertOne(user);
        console.log(insertResult);
        client.close();
        res.redirect('/');
    }
}