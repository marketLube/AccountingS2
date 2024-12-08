import APIFeatures from "../APIFeatures/APIFeatures.js";
import Bank from "../Models/bankModel.js";
import Branch from "../Models/branchModel.js";
import Transaction from "../Models/transactionModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";

import { getAll, getOne, createOne, deleteOne } from "./handlerFactory.js";
import { downloadReport } from "./Reports/transactionReport.js";

export const downloadTranscation = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return next(new AppError("Please provide start and end date", 400));
  }
  const features = new APIFeatures(
    Transaction,
    Transaction.find({}),
    req.query
  );

  features.filter().sort().filterByBranch().filterByDateRange();

  const transaction = await features.query;

  const filteredTransaction = transaction.map((obj) => {
    const plainObj = obj.toObject();
    plainObj.catagory = plainObj.catagory.name;
    plainObj.particular = plainObj.particular.name;
    delete plainObj.updatedAt;
    delete plainObj.createdAt;
    delete plainObj._id;
    delete plainObj.remark;
    return plainObj;
  });
  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }
  downloadReport(filteredTransaction, res, startDate, endDate);
});

export const updateTransaction = catchAsync(async (req, res, next) => {
  const { id: transactionId } = req.params;
  const updates = req.body;
  updates._id = transactionId;

  const transaction = new Transaction(updates);

  try {
    await transaction.save();
  } catch (err) {
    console.log(err, "err");
    await Transaction.create(req.oldTransaction);
    return next(new AppError("Failed to create transactions", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully",
    transaction,
  });
});

export const deleteTransactionByIdMiddleWare = catchAsync(
  async (req, res, next) => {
    // Fetch the transaction by ID and populate bank and branch references
    const { id: transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    // If the transaction does not exist, return an error
    if (!transaction) {
      return next(new AppError("Transaction not found", 404));
    }

    const { branches, bank, amount, type } = transaction;

    // Update each branch's balance
    for (const branchTransaction of branches) {
      const { amount: branchAmount, branch: branchDoc } = branchTransaction;

      if (!branchDoc) {
        return next(new AppError(`Branch not found`, 404));
      }

      // Find the account for this bank in the branch's accounts array
      const curBranch = await Branch.findById(branchDoc);

      const branchAccount = curBranch.accounts?.find(
        (account) => account.bank.toString() === bank._id.toString()
      );

      if (!branchAccount) {
        return next(
          new AppError(
            `Bank account not found in branch ${curBranch.name}`,
            404
          )
        );
      }

      // Reverse the balance update based on transaction type
      if (type === "Credit") {
        // If it was originally a credit, subtract now
        branchAccount.branchBalance -= branchAmount;
        curBranch.totalBranchBalance -= branchAmount;
      } else if (type === "Debit") {
        // If it was originally a debit, add back
        branchAccount.branchBalance += branchAmount;
        curBranch.totalBranchBalance += branchAmount;
      }

      await curBranch.save();
    }

    const curBank = await Bank.findById(bank);

    // Reverse bank balance update
    if (type === "Credit") {
      // If it was originally a credit, subtract from bank balance
      curBank.balance -= amount;
    } else if (type === "Debit") {
      // If it was originally a debit, add to bank balance
      curBank.balance += amount;
    }

    await curBank.save();

    // Delete the transaction after updates are successful
    await Transaction.findByIdAndDelete(transactionId);

    // Store transaction info for potential use in subsequent middleware
    req.params.id = transactionId;
    req.oldTransaction = transaction.toObject();

    next();
  }
);

export const getAllTransaction = getAll(Transaction);
export const getTransaction = getOne(Transaction);
export const createTransaction = createOne(Transaction);
// const updateTransaction = updateOne(Transaction);
export const deleteTransaction = deleteOne(Transaction);
