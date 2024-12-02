import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.CONNECTION_STR;

// Create a connection pool to handle multiple invocations
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Connection pool size
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Socket timeout
    });

    cachedConnection = connection;
    console.log("Connected to Database");
    return connection;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

// Export the handler for serverless deployment
export default async function handler(req, res) {
  // Set CORS headers
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

    // Handle the request using your Express app
    return app(req, res);
  } catch (err) {
    console.error("Error handling request:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
