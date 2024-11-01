import express from "express";
import {
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  createEvent,
} from "../Controller/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
