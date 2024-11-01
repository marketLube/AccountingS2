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
} from "../Controller/authController.js";

const router = express.Router();

router.post("/verify", verify);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/login-otp", loginByOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", logout);
router.post("/resetPassword", protect, resetPassword);

export default router;
