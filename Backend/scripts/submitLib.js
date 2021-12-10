const config = require('../config.json');
const {MongoClient, ObjectId} = require('mongodb');
const { fillOutLib } = require('./regexLib');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collectionLib = db.collection('Lib');
const collectionUser = db.collection('LibUser');
const collectionDone = db.collection('DoneLib');

exports.finishLib = async (req, res) => {
    try {
        await client.connect();
        const Lib = await collectionLib.findOne({_id:ObjectId(req.params.id)});
        await client.close();
        const details = {}
        details.title = Lib.Title;
        details.creator = Lib.Creator;
        details.id = ObjectId(Lib._id);
        const content = await fillOutLib(Lib.Content, req.body);
        res.render('viewLib', {
            title: "View MadLib", profile: req.session.user.username
            , config
            , player: req.session.user.username
            , details
            , content
            , newLib: 1
        });
    } catch (error) {
        console.log(error);
        res.redirect('/lost');
    }
}

exports.saveLib = async (req, res) => {
    try {
        let doneLib = {
            Details: JSON.parse(req.body.details),
            Content: req.body.content,
            Player: req.session.user.username
        }
        await client.connect();
        const finished = await collectionDone.insertOne(doneLib);
        console.log(finished);
        await client.close();
        res.redirect('/profile/' + req.session.user.username);
    } catch (err) {
        console.log(err);
        res.redirect('/lost');
    }
}