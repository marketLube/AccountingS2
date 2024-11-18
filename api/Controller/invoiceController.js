import Invoice from "../Models/invoiceModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllInvoice = getAll(Invoice);
export const getInvoice = getOne(Invoice);
export const createInvoice = createOne(Invoice);
export const updateInvoice = updateOne(Invoice);
export const deleteInvoice = deleteOne(Invoice);
