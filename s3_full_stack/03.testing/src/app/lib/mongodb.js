// 03.testing/src/app/lib/mongodb.js
// lib/mongodb.js
import { MongoClient } from 'mongodb';

<<<<<<< HEAD
const MONGODB_URI = 'mongodb+srv://homasvikaneriacg_db_user:hXuiEBdZTx5BLR0S@sample.rp4qyan.mongodb.net/test?retryWrites=true&w=majority';
=======
const MONGODB_URI = 'Your Mongodb connection url';
>>>>>>> 4c4359b4c7c8ed7d0f0d9782e74bd0b293306187

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required.');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // preserve across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;