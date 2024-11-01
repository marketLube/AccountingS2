import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.CONNECTION_STR;

// Connect to MongoDB
mongoose
  .connect(Db)
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit if the database connection fails
  });

// Instead of app.listen(), export the app
export default function handler(req, res) {
  return app(req, res);
}

// // Improved error handling for server start
// const PORT = process.env.PORT || 8000; // Use environment variable for port
// const server = app.listen(PORT, (err) => {
//   if (err) {
//     console.error("Error starting the server:", err);
//   } else {
//     console.log(`Server is running on port ${PORT}`);
//   }
// });
