import express from "express";
import {
  getAllReminder,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
  downloadReminder,
} from "../Controller/reminderController.js";

const router = express.Router();

router.get("/download", downloadReminder);

router.get("/", getAllReminder);
router.get("/:id", getReminder);
router.post("/", createReminder);
router.patch("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
