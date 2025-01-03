import express from "express";

import {
  getAllBranch,
  createBranch,
  updateBranch,
  getBranch,
  deleteBranch,
} from "../Controller/branchController.js";
import { getTotals } from "../Aggregation/dashbordAggregate.js";

const router = express.Router();

router.get("/totals", getTotals);

router.get("/", getAllBranch);
router.get("/:id", getBranch);
router.post("/", createBranch);
router.patch("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
