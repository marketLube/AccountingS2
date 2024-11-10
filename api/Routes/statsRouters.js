import express from "express";
import { getTotals } from "../Aggregation/dashbordAggregate.js";

const router = express.Router();

router.get("/totals", getTotals);

export default router;
