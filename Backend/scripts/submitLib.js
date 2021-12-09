const config = require('../config.json');
const {MongoClient, ObjectId} = require('mongodb');
const { fillOutLib } = require('./regexLib');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collectionLib = db.collection('Lib');
const collectionUser = db.collection('LibUser');

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
            title: "View MadLib"
            , config
            , details
            , content
        });
    } catch (error) {
        console.log(error);
        res.redirect('/lost');
    }
}