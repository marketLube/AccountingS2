import catchAsync from "../../Utilities/catchAsync.js";
import LiabilityAndOutstanding from "../../Models/liabilityModel.js";
import Transaction from "../../Models/transactionModel.js";
import mongoose from "mongoose";

export const getParticularDetails = catchAsync(async (req, res, next) => {
  const { particular } = req.query;

  const particularId = new mongoose.Types.ObjectId(particular);

  const transactions = await Transaction.find({ particular: particularId });
  const liability = await LiabilityAndOutstanding.find({
    particular: particularId,
  });

  const result = [...transactions, ...liability];

  res
    .status(200)
    .json({ message: "Successfully fetched", status: "Success", result });
});
