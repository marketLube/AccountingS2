import express from "express";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import AppError from "./Utilities/appError.js";
import versionOne from "./versions/v1.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";

const app = express();

// Middleware
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v2", versionOne);

// 404 handler
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find the ${req.originalUrl} on the page!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
