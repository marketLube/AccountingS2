// lib/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.CONNECTION_STR;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("🟢 Using existing MongoDB connection");
    return cached.conn;
  }

  try {
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log("🟡 Connecting to MongoDB...");

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log(`🟢 MongoDB Connected Successfully!`);

        // Log the database name
        const dbName = mongoose.connection.db.databaseName;
        console.log(`📚 Connected to database: ${dbName}`);

        return mongoose;
      });
    }

    cached.conn = await cached.promise;

    // Set up connection error handler
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    // Set up disconnection handler
    mongoose.connection.on("disconnected", () => {
      console.log("🔴 MongoDB disconnected");
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });

    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    cached.promise = null;
    throw error;
  }
}

export default connectDB;
