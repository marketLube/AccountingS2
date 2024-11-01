import express from "express";
import {
  getAllParticulars,
  createParticulars,
  deleteParticulars,
  updateParticulars,
  getParticulars,
} from "../Controller/particularController.js";

const router = express.Router();

router.route("/").get(getAllParticulars).post(createParticulars);
router
  .route("/:id")
  .get(getParticulars)
  .patch(updateParticulars)
  .delete(deleteParticulars);

export default router;
