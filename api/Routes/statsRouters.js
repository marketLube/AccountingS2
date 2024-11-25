import express from "express";
import {
  getBranchTotalsForChart,
  getTotals,
} from "../Aggregation/dashbordAggregate.js";
import { balanceSheet } from "../Aggregation/balanceSheetAggregate.js";
import { wholeYearPnl } from "../Aggregation/wholeYearPnl.js";

const router = express.Router();

router.get("/totals", getTotals);
router.get("/branchwise-total", getBranchTotalsForChart);
router.get("/balance-sheet", balanceSheet);
router.get("/yearly-pnl", wholeYearPnl);

export default router;
