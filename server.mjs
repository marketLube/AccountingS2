// server.mjs
import next from "next";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const dev = process.env.ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();
    const server = express();
    // Middleware
    server.use(express.json({ limit: "10kb" }));
    server.use(cookieParser());
    server.use(cors());

    // Import API routes
    const apiRoutes = await import("./api/index.js");

    // Important: Handle API routes before Next.js routes
    server.use("/api", apiRoutes.default);

    // Handle Next.js pages
    server.all("*", (req, res) => {
      // Only pass to Next.js if it's not an API route
      if (!req.url.startsWith("/api/")) {
        return handle(req, res);
      }
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

startServer();
