import express from "express";
import {
  getBranchTotalsForChart,
  getTotals,
} from "../Aggregation/dashbordAggregate.js";
import { balanceSheet } from "../Aggregation/balanceSheetAggregate.js";
import { wholeYearPnl } from "../Aggregation/wholeYearPnl.js";
import { branchWiseCircleCharts } from "../Aggregation/branchWiseCircleCharts.js";
import { migrate } from "../Controller/dataMigrateController.js";
import { calculateGSTTotals } from "../Aggregation/features/totalGst.js";
import { particularWiseGst } from "../Aggregation/features/particularWiseGst.js";

const router = express.Router();

router.get("/gst", calculateGSTTotals);
router.get("/totals", getTotals);
router.get("/branchwise-total", getBranchTotalsForChart);
router.get("/balance-sheet", balanceSheet);
router.get("/yearly-pnl", wholeYearPnl);
router.get("/branchwise-circle", branchWiseCircleCharts);
router.patch("/migrate", migrate);
router.get("/particular-wise-gst", particularWiseGst);

export default router;
