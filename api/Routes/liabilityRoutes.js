import express from "express";
import {
  getAllLiability,
  getLiability,
  updateLiability,
  createLiability,
  deleteLiability,
  getTotal,
  downloadLiability,
} from "../Controller/liabilityController.js";

const router = express.Router();

router.get("/download", downloadLiability);

router.get("/total", getTotal);

router.get("/", getAllLiability);
router.get("/:id", getLiability);
router.post("/", createLiability);
router.patch("/:id", updateLiability);
router.delete("/:id", deleteLiability);

export default router;
