import express from "express";
import { getAllLedgers } from "../Aggregation/Ledgers.js";

const router = express.Router();

router.get("/", getAllLedgers);

export default router;
