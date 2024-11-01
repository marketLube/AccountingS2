import express from "express";
import {
  getAllUniv,
  getUniversity,
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getTotalReceivable,
} from "../Controller/universityController.js";

const router = express.Router();

router.get("/totals", getTotalReceivable);

router.get("/", getAllUniv);
router.get("/:id", getUniversity);
router.post("/", createUniversity);
router.patch("/:id", updateUniversity);
router.delete("/:id", deleteUniversity);

export default router;
