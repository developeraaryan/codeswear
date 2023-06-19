import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGO_URI; // Replace with your MongoDB connection string
const dbName = 'myDatabase'; // Replace with your database name

export async function connectToDatabase() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();

  const db = client.db(dbName);
  const usersCollection = db.collection('users');

  return { client, usersCollection };
}

export async function saveUser(user) {
  const { client, usersCollection } = await connectToDatabase();
  await usersCollection.insertOne(user);
  client.close();
}
