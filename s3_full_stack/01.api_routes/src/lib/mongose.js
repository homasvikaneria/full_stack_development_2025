// 01.api_routes/src/lib/mongose.js
// 01.api_routes/lib/mongose.js
import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI; // from .env

  if (!uri) {
    throw new Error("Please define the MONGODB_URI in your .env file");
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB, // optional if your URI already contains the DB
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
