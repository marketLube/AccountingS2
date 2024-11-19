import express from "express";
import {
  getAllTransaction,
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
  deleteTransactionByIdMiddleWare,
  downloadTranscation,
} from "../Controller/transactionController.js";

const router = express.Router();

router.get("/download", downloadTranscation);

router.get("/", getAllTransaction);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.patch("/:id", deleteTransactionByIdMiddleWare, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
