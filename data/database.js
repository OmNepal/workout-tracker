const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://localhost:27017')
  database = client.db('workout-tracker')
}

function getDb() {
  if (!database) {
    throw new Error('Could not connect to the database')
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
}