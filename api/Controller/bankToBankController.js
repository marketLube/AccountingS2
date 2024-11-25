import Bank from "../Models/bankModel.js";
import BankToBank from "../Models/banktoBankModel.js";
import Branch from "../Models/branchModel.js";
import AppError from "../Utilities/appError.js";
import catchAsync from "../Utilities/catchAsync.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const bankToBankMiddleWare = catchAsync(async (req, res, next) => {
  const { fromBank, toBank, fromBranch, toBranch, amount } = req.body;

  // 1. Basic input validation
  if (!fromBank || !toBank || !fromBranch || !toBranch) {
    return next(new AppError("Please provide all required fields", 400));
  }

  if (!amount || amount <= 0) {
    return next(new AppError("Please provide a valid positive amount", 400));
  }

  // 2. Find both branches
  const fromBranchObj = await Branch.findById(fromBranch);
  const toBranchObj = await Branch.findById(toBranch);

  // 3. Validate branch existence
  if (!fromBranchObj || !toBranchObj) {
    return next(new AppError("Invalid branch details", 400));
  }

  // 4. Find accounts in respective branches
  const fromAcc = fromBranchObj.accounts.find(
    (bank) => bank.bank?.toString() === fromBank.toString()
  );

  const toAcc = toBranchObj.accounts.find(
    (bank) => bank.bank?.toString() === toBank.toString()
  );

  // 5. Validate both accounts exist
  if (!fromAcc) {
    return next(new AppError("Invalid source account", 400));
  }

  if (!toAcc) {
    return next(new AppError("Invalid destination account", 400));
  }

  // 7. Perform the transfer
  try {
    // Update account balances
    fromAcc.branchBalance -= amount;
    toAcc.branchBalance += amount;

    // Update total branch balances
    fromBranchObj.totalBranchBalance -= amount;
    toBranchObj.totalBranchBalance += amount;

    // Save both branches
    await Promise.all([fromBranchObj.save(), toBranchObj.save()]);

    // Add transfer details to request object for subsequent middleware
    req.body = {
      fromBranch: fromBranchObj._id,
      toBranch: toBranchObj._id,
      fromBank,
      toBank,
      amount,
    };

    next();
  } catch (error) {
    return next(new AppError("Transfer failed. Please try again.", 500));
  }
});

export const getAllBtoB = getAll(BankToBank);
export const getBtoB = getOne(BankToBank);
export const createBtob = createOne(BankToBank);
export const updateBtob = updateOne(BankToBank);
export const deleteBtob = deleteOne(BankToBank);
