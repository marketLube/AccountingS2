import express from "express";
import {
  createAssets,
  deleteAssets,
  getAllAssets,
  getAssets,
  updateAssets,
} from "../Controller/assetsController.js";

const router = express.Router();

router.get("/", getAllAssets);
router.get("/:id", getAssets);
router.post("/", createAssets);
router.patch("/:id", updateAssets);
router.delete("/:id", deleteAssets);

export default router;
