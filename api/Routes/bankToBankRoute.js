import express from "express";
import {
  createBtob,
  deleteBtob,
  getAllBtoB,
  getBtoB,
  updateBtob,
} from "../Controller/bankToBankController.js";

const router = express.Router();

router.get("/", getAllBtoB);
router.post("/", createBtob);
router.get("/:id", getBtoB);
router.patch("/:id", updateBtob);
router.delete("/:id", deleteBtob);

export default router;
