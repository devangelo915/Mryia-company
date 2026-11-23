import { MongoClient, Db, GridFSBucket } from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getDbName() {
  return process.env.MONGODB_DB_NAME || "mryia";
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export function mongoPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (!global.mongoClientPromise) {
    global.mongoClientPromise = new MongoClient(uri, {
      maxPoolSize: 10,
      retryWrites: true,
    }).connect();
  }
  return global.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await mongoPromise();
  return client.db(getDbName());
}

export async function getBucket(bucketName = "uploads"): Promise<GridFSBucket> {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName });
}
