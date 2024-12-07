const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const dbName = 'poetryportfolios';

let db;
let userCollection;

// Connect to the database and initialize collections
async function connectToDatabase() {
  if (!db) {
    try {
      console.log('Connecting to the database...');
      await client.connect();
      db = client.db(dbName);
      userCollection = db.collection('users');
      console.log('Database connection successful!');
    } catch (error) {
      console.error('Failed to connect to the database:', error.message);
      process.exit(1); // Exit on critical failure
    }
  }
  return {db, userCollection};
}

// Export functions that interact with the database
async function getUser(email) {
  await connectToDatabase();
  return userCollection.findOne({ email });
}

async function updateUserBio(email, bio) {
  await connectToDatabase();
  return userCollection.updateOne(
    { email },
    { $set: { bio } },
    { upsert: true }
  );
}

async function updateUserFolder(email, folder) {
  await connectToDatabase();
  return userCollection.updateOne(
    { email },
    { $set: { folder } },
    { upsert: true }
  );
}

async function createUser(user) {
  await connectToDatabase();
  return userCollection.insertOne(user);
}

const updateUserToken = async (email, token) => {
  // Your code to update the user's token in the database, e.g.:
  try {
    const db = client.db('poetryportfolios');
    console.log(db);
    const usersCollection = db.collection('users');
    console.log(email, token);
    console.log(usersCollection);
    const result = await usersCollection.updateOne(
      { email: email }, 
      { $set: { token: token } }
    );
    return result;
  } catch (error) {
    console.error('Error updating user token:', error);
    throw error;  // Rethrow the error so it can be caught in your route handler
  }

};

module.exports = {
  connectToDatabase,
  getUser,
  updateUserBio,
  createUser,
  updateUserToken
};
