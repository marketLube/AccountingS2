import express from "express";
import {
  createCapital,
  deleteCapital,
  getAllCapital,
  getCapital,
  updateCapital,
} from "../Controller/capitalController.js";

const router = express.Router();

router.get("/", getAllCapital);
router.get("/:id", getCapital);
router.post("/", createCapital);
router.patch("/:id", updateCapital);
router.delete("/:id", deleteCapital);

export default router;
