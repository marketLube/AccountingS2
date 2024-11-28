import Transaction from "../Models/transactionModel.js";
import catchAsync from "../Utilities/catchAsync.js";

const bankIdentifier = (transObj) => {
  if (transObj.bank === "BANDAN") {
    transObj.bank = "671bd39baff217a447d34c69";
  }

  return transObj;
};

export const migrate = catchAsync(async (req, res, next) => {
  // Fetch all transactions
  const transactions = await Transaction.find();

  // Use `Promise.all` for parallel async operations
  const updatedTransactions = await Promise.all(
    transactions.map(async (transaction) => {
      bankIdentifier(transaction); // Update the bank field
      await transaction.save({ runValidators: false }); // Save transaction without re-validating
      return transaction;
    })
  );

  res
    .status(200)
    .json({ message: "Success", transactions: updatedTransactions });
});
