const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb+srv://admin:admin@cluster0.up6aq.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'madOnline';
const db = client.db(dbName);
const collection = db.collection('Lib');

exports.getAll = async (req, res) => {
    await client.connect();
    const results = await collection.find({ "Creator": req.session.user.username }).toArray();
    await client.close();
    res.send(results);
}