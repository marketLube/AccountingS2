import express from "express";
import {
  signUp,
  login,
  logout,
  loginByOtp,
  verifyOtp,
  verify,
  resetPassword,
  protect,
  updateMe,
} from "../Controller/authController.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../Controller/userController.js";

const router = express.Router();

router.post("/verify", verify);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/login-otp", loginByOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logout);
router.post("/resetPassword", resetPassword);
router.patch("/update-me", updateMe);

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
