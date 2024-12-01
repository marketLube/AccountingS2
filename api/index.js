import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.CONNECTION_STR;

// Use a global variable to maintain a MongoDB connection across invocations
let isConnected;

async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const dbConnection = await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = dbConnection.connections[0].readyState === 1;
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err; // Re-throw the error to prevent further execution
  }
}

// Export the handler for serverless deployment
export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Ensure the database connection is established
    return app(req, res); // Delegate request handling to the Express app
  } catch (err) {
    console.error("Error handling request:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
