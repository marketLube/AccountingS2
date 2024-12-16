import mongoose from "mongoose";
import Transaction from "../Models/transactionModel.js";
import catchAsync from "../Utilities/catchAsync.js";

const bankMapping = {
  HDFC: new mongoose.Types.ObjectId("675d4c0ca00eaa374ab86664"),
};

export const migrate = catchAsync(async (req, res, next) => {
  const trans = await Transaction.find({ type: "Debit", bank: "HDFC" });

  trans.map((t) => (t.bank = "675d4c0ca00eaa374ab86664"));

  res.status(200).json({ trans, length: trans.length });
});
