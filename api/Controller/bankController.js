import Bank from "../Models/bankModel.js";
import Transaction from "../Models/transactionModel.js";
import AppError from "../Utilities/appError.js";

import catchAsync from "../Utilities/catchAsync.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const bankTransfer = catchAsync(async (req, res, next) => {
  const { from, to, amount } = req.body;

  const fromBank = await Bank.findOne({ name: from });
  const toBank = await Bank.findOne({ name: to });

  if (!fromBank || !toBank) return next(new AppError("Invalid banks..."));

  let amt;

  if (Number(amount)) {
    amt = Number(amount);
  } else {
    return next(new AppError("Invalid Number"));
  }

  fromBank.balance -= amt;
  toBank.balance += amt;

  await fromBank.save();
  await toBank.save();

  res
    .status(200)
    .json({ status: "Success", message: "Successfully updated banks" });
});

export const getAllBank = getAll(Bank);
export const getBank = getOne(Bank);
export const createBank = createOne(Bank);
export const updateBank = updateOne(Bank);
export const deleteBank = deleteOne(Bank);
