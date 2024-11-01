import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Dynamically import API routes to handle ES module format
  (async () => {
    const apiRoutes = await import("./api/index.js");
    server.use("/api", apiRoutes.default);
  })();

  // Handle Next.js routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
