import APIFeatures from "../APIFeatures/APIFeatures.js";
import Bank from "../Models/bankModel.js";
import Branch from "../Models/branchModel.js";
import Transaction from "../Models/transactionModel.js";
import Liability from "../Models/liabilityModel.js";
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
    await transaction.save({ runValidators: true });
  } catch (err) {
    await Transaction.create(req.oldTransaction);
  }
  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully",
    transaction,
  });
});

export const deleteTransactionByIdMiddleWare = catchAsync(
  async (req, res, next) => {
    // Fetch the transaction by ID
    const { id: transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    // If the transaction does not exist, return an error
    if (!transaction) {
      return next(new AppError("Transaction not found", 404));
    }

    const { branches, bank: curBank, amount, type } = transaction;

    // Update each branch's balance
    for (let i = 0; i < branches.length; i++) {
      const { amount: branchAmount, branchName } = branches[i];
      const curBranch = await Branch.findOne({ name: branchName });

      if (!curBranch) {
        return next(new AppError(`Branch ${branchName} not found`, 404));
      }

      if (type === "Credit") {
        curBranch[curBank] -= branchAmount;
      } else if (type === "Debit") {
        curBranch[curBank] += branchAmount;
      }

      await curBranch.save();
    }

    // Update bank balance
    const bank = await Bank.findOne({ name: curBank });
    if (!bank) {
      return next(new AppError(`Bank ${curBank} not found`, 404));
    }

    if (type === "Credit") {
      bank.balance -= amount;
    } else if (type === "Debit") {
      bank.balance += amount;
    }

    await bank.save();

    // Delete the transaction after updates are successful
    await Transaction.findByIdAndDelete(transactionId);

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
