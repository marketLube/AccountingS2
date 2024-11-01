import express from "express";
import { getAll, createOne } from "../Controller/handlerFactory.js";
import Log from "../Models/logModel.js";

const router = express.Router();

router.route("/").get(getAll(Log)).post(createOne(Log));

export default router;
