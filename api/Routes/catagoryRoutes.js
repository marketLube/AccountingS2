import express from "express";
import {
  addParticular,
  getAllCatagory,
  getCatagory,
  createCatagory,
  updateCatagory,
  deleteCatagory,
  deleteParticular,
  updateParticular,
} from "../Controller/catagoryController.js";

const router = express.Router();
router.route("/addParticular").patch(addParticular);
router.route("/deleteParticular").patch(deleteParticular);
router.route("/updateParticular").patch(updateParticular);

router.route("/").get(getAllCatagory).post(createCatagory);
router.route("/:id").get(getCatagory);
router.route("/:id").patch(updateCatagory);
router.route("/:id").delete(deleteCatagory);

export default router;
