import mongoose from "mongoose";
import app from "./app.js";

const Db = process.env.CONNECTION_STR;

// Connect to MongoDB
console.log(Db, "db");
mongoose
  .connect(Db)
  .then(() => console.log("Connected to Database"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

// Instead of app.listen(), export the app
export default function handler(req, res) {
  return app(req, res);
}
