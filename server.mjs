import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.CONNECTION_STR;

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = connection;
    console.log("Connected to Database");
    return connection;
  } catch (err) {
    console.error("Detailed Database Connection Error:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Establish database connection
    await connectToDatabase();

    // Create a promise-based wrapper for the Express app
    return new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) {
          console.error("Express App Error:", err);
          res.status(500).json({
            error: "Internal Server Error",
            details: err.message,
          });
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error("Request Handling Error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
