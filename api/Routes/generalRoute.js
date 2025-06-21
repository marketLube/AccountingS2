import express from "express";
import { getAllLedgers, downloadLedgerReport } from "../Aggregation/Ledgers.js";

const router = express.Router();

router.get("/download", downloadLedgerReport);
router.get("/", getAllLedgers);

export default router;
