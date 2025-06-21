import APIFeatures from "../APIFeatures/APIFeatures.js";
import Bank from "../Models/bankModel.js";
import Branch from "../Models/branchModel.js";
import Transaction from "../Models/transactionModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import { getAll, getOne, createOne, deleteOne } from "./handlerFactory.js";
import { downloadReport } from "./Reports/transactionReport.js";
import { downloadExcelReport } from "./Reports/transactionReportxsl.js";

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

  // Apply ALL available filters comprehensively
  features
    .filter() // Basic field filtering (type, category, particular, bank, etc.)
    .search() // Text search across multiple fields
    .sort() // Sorting by specified fields
    .gstType() // GST type filtering (gst/no-gst)
    .filterByBranch() // Branch-specific filtering
    .filterByDateRange(); // Date range filtering

  const transaction = await features.query
    .populate("catagory")
    .populate("particular")
    .populate("bank")
    .populate("branches.branch");

  const filteredTransaction = transaction.map((obj) => {
    const plainObj = obj.toObject();
    plainObj.catagory = plainObj.catagory.name;
    plainObj.particular = plainObj.particular.name;
    plainObj.bank = plainObj.bank.name;
    // Format date for display
    if (plainObj.date) {
      plainObj.formattedDate = new Date(plainObj.date).toLocaleDateString();
    }
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

export const downloadExcelTransaction = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return next(new AppError("Please provide start and end date", 400));
  }
  const features = new APIFeatures(
    Transaction,
    Transaction.find({}),
    req.query
  );

  // Apply ALL available filters comprehensively
  features
    .filter() // Basic field filtering (type, category, particular, bank, etc.)
    .search() // Text search across multiple fields
    .sort() // Sorting by specified fields
    .gstType() // GST type filtering (gst/no-gst)
    .filterByBranch() // Branch-specific filtering
    .filterByDateRange(); // Date range filtering

  console.log("Query filters applied:", req.query);
  console.log("Features query object:", features.queryStr);

  const transaction = await features.query
    .populate("catagory")
    .populate("particular")
    .populate("bank")
    .populate("branches.branch");

  console.log(
    `Found ${transaction.length} transactions with all filters applied`
  );
  if (req.query.branchId) {
    console.log(`Filtering by branch ID: ${req.query.branchId}`);
  }

  const filteredTransaction = transaction.map((obj) => {
    const plainObj = obj.toObject();
    plainObj.catagory = plainObj.catagory.name;
    plainObj.particular = plainObj.particular.name;
    plainObj.bank = plainObj.bank.name;

    // Handle branch-specific data when filtered by branch
    if (req.query.branchId) {
      const filteredBranch = plainObj.branches?.find(
        (branch) => branch.branch?._id?.toString() === req.query.branchId
      );
      if (filteredBranch) {
        plainObj.amount = filteredBranch.amount || plainObj.amount;
        plainObj.branchTotalAmt =
          filteredBranch.branchTotalAmt || filteredBranch.amount;
        plainObj.filteredBranchName = filteredBranch.branch?.name;
      }
    }

    // Format date for display
    if (plainObj.date) {
      plainObj.formattedDate = new Date(plainObj.date).toLocaleDateString();
    }
    delete plainObj.updatedAt;
    delete plainObj.createdAt;
    delete plainObj._id;
    delete plainObj.remark;
    return plainObj;
  });

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }
  await downloadExcelReport(filteredTransaction, res, startDate, endDate);
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
