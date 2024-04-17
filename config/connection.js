const { MongoClient, ObjectID } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async function () {
    try {
        await client.connect();
        console.log('Connected to the database')
    } catch (error) {
      console.log(error)
      console.error("\x1b[31m", "Unable to connect to database", "\x1b[0m");
    }
  };

  connect();

const db = client;

module.exports = db


