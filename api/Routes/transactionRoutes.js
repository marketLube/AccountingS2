import express from "express";
import {
  getAllTransaction,
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
  deleteTransactionByIdMiddleWare,
  downloadTranscation,
  downloadExcelTransaction,
} from "../Controller/transactionController.js";
import { calculateGSTTotals } from "../Aggregation/features/totalGst.js";
import categoryFilterMiddleware from "../middlewares/catagoryMiddleWare.js";

const router = express.Router();

router.get("/download", downloadTranscation);
router.get(
  "/download-excel",
  categoryFilterMiddleware,
  downloadExcelTransaction
);
router.get("/gst", calculateGSTTotals);
router.get("/", getAllTransaction);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.patch("/:id", deleteTransactionByIdMiddleWare, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
