import express from "express";
import {
  getBranchTotalsForChart,
  getTotals,
} from "../Aggregation/dashbordAggregate.js";

const router = express.Router();

router.get("/totals", getTotals);
router.get("/branchwise-total", getBranchTotalsForChart);

export default router;
