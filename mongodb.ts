import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Replace with your MongoDB connection URI

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(database: string): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);

  const db = client.db(database);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
