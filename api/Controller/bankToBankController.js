import BankToBank from "../Models/banktoBankModel.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const getAllBtoB = getAll(BankToBank);
export const getBtoB = getOne(BankToBank);
export const createBtob = createOne(BankToBank);
export const updateBtob = updateOne(BankToBank);
export const deleteBtob = deleteOne(BankToBank);
