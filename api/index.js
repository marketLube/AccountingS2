import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.PRIMERY_STR;

// Use a global variable to maintain a MongoDB connection across invocations
let isConnected = false;

// Function to connect to the database
async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // Connect to the database
    const dbConnection = await mongoose.connect(Db);

    // Set connection state
    isConnected = dbConnection.connections[0].readyState === 1;
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    throw new Error("Failed to connect to the database");
  }
}

// Export the handler for serverless deployment
export default async function handler(req, res) {
  try {
    // Ensure the database connection is established
    await connectToDatabase();

    // Delegate request handling to the Express app
    return app(req, res);
  } catch (err) {
    // Log the error and return a proper error response
    console.error("Error handling request:", err.message);

    // Respond with a detailed error message during development
    if (process.env.NODE_ENV === "development") {
      return res.status(500).json({ error: err.message });
    }

    // Generic response for production
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
