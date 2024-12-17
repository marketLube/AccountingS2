import express from "express";
import compression from "compression";
import AppError from "./Utilities/appError.js";
import versionOne from "./versions/v1.js";
import globalErrorHandler from "./Utilities/globalErrorhandler.js";

const app = express();

app.use("/api/v2", versionOne);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find the ${req.originalUrl} on the page!`, 404));
});

app.use(globalErrorHandler);

export default app;
