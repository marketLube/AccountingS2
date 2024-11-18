import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoice,
  getInvoice,
  updateInvoice,
} from "../Controller/invoiceController.js";

const router = express.Router();

router.get("/", getAllInvoice);
router.get("/:id", getInvoice);
router.post("/", createInvoice);
router.patch("/", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
