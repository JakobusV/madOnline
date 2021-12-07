const bcrypt = require("bcryptjs");
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collection = db.collection('LibUser');

exports.checkLogin = async (req, res) => {
    console.log("hello :: /login=post");
    await client.connect();
    if(req.body.password === null || req.body.password == "") {
        console.log("FAILED :: BLANK PASSWORD");
        res.redirect('/');
    } else {
        try {
            const matchingUsername = await collection.findOne({"UserName" : req.body.username});
            bcrypt.compare(req.body.password, matchingUsername.Password, (err, result) => {
                if(result) {
                    req.session.user = {
                        isAuthenticated: true,
                        username: req.body.username,
                        id: matchingUsername._id
                    }
                    console.log(req.session.user);
                    console.log("SUCCESS :: CORRECT PASSWORD");
                    res.redirect('/profile/' + req.body.username);
                } else {
                    console.log("FAILED :: WRONG PASSWORD");
                    res.redirect('/');
                }
            });
        } catch (excep) {
            console.log("FAILED :: WRONG USER");
            res.redirect('/');
        }
    }
}