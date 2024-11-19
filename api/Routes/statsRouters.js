import express from "express";
import {
  getBranchTotalsForChart,
  getTotals,
} from "../Aggregation/dashbordAggregate.js";
import { balanceSheet } from "../Aggregation/balanceSheetAggregate.js";

const router = express.Router();

router.get("/totals", getTotals);
router.get("/branchwise-total", getBranchTotalsForChart);
router.get("/balance-sheet", balanceSheet);

export default router;
