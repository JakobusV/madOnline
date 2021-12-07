const bcrypt = require("bcryptjs");
const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collection = db.collection('LibUser');

let salt = bcrypt.genSaltSync(10);

exports.updateUser = async (req, res) => {
    let changeList = {};
    let hash;
    if(req.body.username != null && req.body.username != "") {
        changeList["UserName"] = req.body.username;
    }
    if(req.body.password != null && req.body.password != "" && req.body.password == req.body.confPass) {
        changeList["Password"] = req.body.password;
        hash = bcrypt.hashSync(req.body.password, salt);
    }
    if(req.body.bio != null && req.body.bio != "") {
        changeList["Description"] = req.body.bio;
    }
    if(req.body.pfp != null && req.body.pfp != "") {
        changeList["pfp"] = req.body.pfp;
    }
    console.log("editUser method: updateUser");
    await client.connect();
    if (await collection.findOne({ "UserName": req.body.username })) {
        res.redirect('/edit');
    }
    console.log(changeList);
    try {
        const updateResult = await collection.updateOne(
                { "UserName": req.session.user.username },
                { $set: changeList }
            );
            req.session.user.username = req.body.username;
    } catch (err) {
        console.log(err);
    }
    console.log(updateResult);
    client.close();
    res.redirect('/profile/' + req.session.user.username);
}