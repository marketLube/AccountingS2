import mongoose from "mongoose";
import Transaction from "../Models/transactionModel.js";
import catchAsync from "../Utilities/catchAsync.js";

const bankMapping = {
  HDFC: new mongoose.Types.ObjectId("67569de2d1dfd9feee3f94b9"),
};

export const migrate = catchAsync(async (req, res, next) => {
  // Fetch all transactions where the bank is stored as a string
  const transactions = await Transaction.find({
    $or: [{ bank: "HDFC" }], // Add all bank strings you need to migrate
  });

  if (!transactions.length) {
    return res.status(200).json({ message: "No transactions to migrate." });
  }

  // Migrate the `bank` field to ObjectId references
  const updatedTransactions = await Promise.all(
    transactions.map(async (transaction) => {
      const bankString = transaction.bank; // Fetch the current bank string

      // Check if the bank string exists in the mapping
      if (bankMapping[bankString]) {
        transaction.bank = bankMapping[bankString]; // Set the ObjectId reference
        await transaction.save({ validateBeforeSave: false }); // Save without validation
      } else {
        console.warn(
          `Bank '${bankString}' is not recognized for transaction:`,
          transaction._id
        );
      }

      return transaction;
    })
  );

  res.status(200).json({
    message: "Migration completed",
    updatedCount: updatedTransactions.length,
    transactions: updatedTransactions,
  });
});
