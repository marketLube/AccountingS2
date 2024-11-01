import express from "express";
import {
  getAllTransaction,
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
  balanceSheet,
  deleteTransactionByIdMiddleWare,
  downloadTranscation,
} from "../Controller/transactionController.js";

const router = express.Router();

router.get("/balance-sheet", balanceSheet);
router.get("/download", downloadTranscation);

router.get("/", getAllTransaction);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.patch("/:id", deleteTransactionByIdMiddleWare, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
