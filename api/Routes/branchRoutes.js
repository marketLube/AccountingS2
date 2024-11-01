import express from "express";

import {
  getAllBranch,
  createBranch,
  updateBranch,
  getBranch,
  deleteBranch,
  monthWiseBranchPnl,
  yearlyPnl,
  allMonthBranchPnl,
  branchWiseBalance,
} from "../Controller/branchController.js";

const router = express.Router();

router.get("/month-wise-pnl", monthWiseBranchPnl);
router.get("/all-month-pnl", allMonthBranchPnl);
router.get("/branch-wise-balance", branchWiseBalance);
router.get("/yearly-pnl", yearlyPnl);

router.get("/", getAllBranch);
router.get("/:id", getBranch);
router.post("/", createBranch);
router.patch("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
