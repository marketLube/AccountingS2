import express from "express";

import {
  getAllBank,
  createBank,
  updateBank,
  getBank,
  deleteBank,
  getBalance,
  bankTransfer,
} from "../Controller/bankController.js";

const router = express.Router();

router.post("/bank-transfer", bankTransfer);
router.get("/balance", getBalance);

router.get("/", getAllBank);
router.get("/:id", getBank);
router.post("/", createBank);
router.patch("/:id", updateBank);
router.delete("/:id", deleteBank);

export default router;
