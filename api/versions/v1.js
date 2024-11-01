import express from "express";
import transactionRoute from "../Routes/transactionRoutes.js";
import bankRoute from "../Routes/bankRoutes.js";
import branchRoute from "../Routes/branchRoutes.js";
import liabilityRoute from "../Routes/liabilityRoutes.js";
import reminderRoute from "../Routes/reminderRoutes.js";
import userRoute from "../Routes/userRoutes.js";
import eventRoute from "../Routes/eventRoutes.js";
import catagoryRoute from "../Routes/catagoryRoutes.js";
import particularRoute from "../Routes/particularRoutes.js";
import logRoute from "../Routes/logRoutes.js";
import universityRoute from "../Routes/universityRoutes.js";
import { protect } from "../Controller/authController.js";

const router = express.Router();

router.use("/user", userRoute);
// router.use(protect);
router.use("/logs", logRoute);

router.use("/bank", bankRoute);
router.use("/branch", branchRoute);
router.use("/event", eventRoute);
router.use("/catagory", catagoryRoute);
router.use("/particular", particularRoute);

router.use("/transaction", transactionRoute);
router.use("/reminders", reminderRoute);
router.use("/liability", liabilityRoute);
router.use("/university", universityRoute);

export default router;
